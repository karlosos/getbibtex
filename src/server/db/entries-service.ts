import mongoose, { Schema, model } from "mongoose";
import { db } from "./db";

type Entry = {
  date: Date;
  url: string;
  userId: string;
};

const entrySchema = new Schema<Entry>({
  date: { type: Date, required: true },
  url: { type: String, required: true },
  userId: { type: String, required: false },
});

const getModel = () => model("bibtexEntry", entrySchema);
const EntryModel =
  (mongoose.models.bibtexEntry as ReturnType<typeof getModel>) ||
  model<Entry>("bibtexEntry", entrySchema);

type NewEntry = {
  url: string;
  userId: string;
};

async function createLogEntry({ url, userId }: NewEntry) {
  const itemObj = new EntryModel({
    date: Date.now(),
    url: url,
    userId: userId,
  });
  await itemObj.save();
}

const saveRequestToDb = async ({ url, userId }: NewEntry) => {
  await db.connect();
  await createLogEntry({ url: url, userId: userId });

  return;
};

async function getTotalUrlsCount() {
  await db.connect();
  const totalUrlsCount = await EntryModel.find().countDocuments().exec();

  return totalUrlsCount;
}

async function getTotalUrlsCountWeekChange() {
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  const twoWeeksAgo = new Date();
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

  const twoWeeksAgoCountPromise = EntryModel.countDocuments({
    date: { $lte: twoWeeksAgo },
  }).exec();
  const weekAgoCountPromise = EntryModel.countDocuments({
    date: { $lte: weekAgo },
  }).exec();
  const todayCountPromise = EntryModel.find().countDocuments().exec();

  const [twoWeeksAgoCount, weekAgoCount, todayCount] = await Promise.all([
    twoWeeksAgoCountPromise,
    weekAgoCountPromise,
    todayCountPromise,
  ]);

  const weekAgoGrowth = weekAgoCount - twoWeeksAgoCount;
  const todayGrowth = todayCount - weekAgoCount;

  const weekToWeekChange =
    ((todayGrowth - weekAgoGrowth) / weekAgoGrowth) * 100;
  return weekToWeekChange.toFixed(2);
}

async function getRecentUrls() {
  await db.connect();
  const recentUrls = await EntryModel.find().sort({ date: -1 }).limit(5).exec();

  return recentUrls;
}

async function getLastDaysUrlsCount(numOfDays = 7) {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - numOfDays);

  await db.connect();
  const urlsCount = await EntryModel.countDocuments({
    date: { $gte: sevenDaysAgo },
  }).exec();

  return urlsCount;
}

async function getUrlsCountPerDays() {
  await db.connect();

  // Set the time to midnight (00:00)
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  // Tomorrow
  const tomorrowDate = new Date(currentDate);
  tomorrowDate.setDate(currentDate.getDate() + 1);

  // Create an array with dates
  const dates = [tomorrowDate, currentDate];

  const numOfDays = 7;
  for (let i = 1; i < numOfDays; i++) {
    const previousDate = new Date(currentDate);
    previousDate.setDate(currentDate.getDate() - i);
    dates.push(previousDate);
  }

  // Calculate count for each day
  const result = [];
  for (let i = 1; i < dates.length; i++) {
    const count = await EntryModel.countDocuments({
      date: { $lte: dates[i - 1]!, $gte: dates[i]! },
    }).exec();
    result.push({
      date: dates[i]!,
      count: count,
    });
  }

  return result;
}

export const entriesService = {
  saveRequestToDb,
  getTotalUrlsCount,
  getTotalUrlsCountWeekChange,
  getRecentUrls,
  getLastDaysUrlsCount,
  getUrlsCountPerDays,
};
