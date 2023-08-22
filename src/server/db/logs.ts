import mongoose, { Schema, model } from "mongoose";
import { db } from "./db";

type Entry = {
  date: Date;
  url: string;
};

const entrySchema = new Schema<Entry>({
  date: { type: Date, required: true },
  url: { type: String, required: true },
});

const getModel = () => model("bibtexEntry", entrySchema);
const EntryModel =
  (mongoose.models.bibtexEntry as ReturnType<typeof getModel>) ||
  model<Entry>("bibtexEntry", entrySchema);

async function createLogEntry(url: string) {
  const itemObj = new EntryModel({
    date: Date.now(),
    url: url,
  });
  await itemObj.save();
}

const saveRequestToDb = async (url: string) => {
  await db.connect();
  await createLogEntry(url);

  return;
};

async function getTotalUrlsCount(options: { tillDate?: Date } = {}) {
  await db.connect();
  const totalUrlsCount = await EntryModel.find().countDocuments().exec();

  return totalUrlsCount;
}

async function getTotalUrlsCountWeekChange() {
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  const twoWeeksAgo = new Date();
  twoWeeksAgo.setDate(weekAgo.getDate() - 14);

  const twoWeeksAgoCountPromise = EntryModel.countDocuments({
    date: { $lte: twoWeeksAgo},
  }).exec();
  const weekAgoCountPromise = EntryModel.countDocuments({
    date: { $lte: weekAgo },
  }).exec();
  const todayCountPromise = EntryModel.find().countDocuments().exec();

  const [twoWeeksAgoCount, weekAgoCount, todayCount] = await Promise.all([twoWeeksAgoCountPromise, weekAgoCountPromise, todayCountPromise]);

  const weekAgoGrowth = weekAgoCount - twoWeeksAgoCount;
  const todayGrowth = todayCount - weekAgoCount;

  const weekToWeekChange = todayGrowth/weekAgoGrowth;
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

export const bookkeepingService = {
  saveRequestToDb,
  getTotalUrlsCount,
  getTotalUrlsCountWeekChange,
  getRecentUrls,
  getLastDaysUrlsCount,
};
