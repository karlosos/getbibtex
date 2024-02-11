import mongoose, { Schema, model } from "mongoose";

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

//
// Commands
//
async function createLogEntry({ url, userId }: NewEntry) {
  const itemObj = new EntryModel({
    date: Date.now(),
    url: url,
    userId: userId,
  });
  await itemObj.save();
}

const saveRequestToDb = async ({ url, userId }: NewEntry) => {
  await createLogEntry({ url: url, userId: userId });

  return;
};

export const removeEntriesForUser = async ({ userId }: { userId: string }) => {
  await EntryModel.deleteMany({ userId: userId }).exec();

  return;
};

//
// Queries
//
async function getTotalUrlsCount() {
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
  const recentUrls = await EntryModel.find().sort({ date: -1 }).limit(5).exec();

  return recentUrls;
}

async function getLastDaysUrlsCount(numOfDays = 7) {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - numOfDays);

  const urlsCount = await EntryModel.countDocuments({
    date: { $gte: sevenDaysAgo },
  }).exec();

  return urlsCount;
}

async function getUrlsCountPerDays() {
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
  const result = new Array<{ date: Date; count: number }>();
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

async function getTotalUsersCount() {
  const users = await EntryModel.find().distinct("userId");
  const totalUsersCount = users.length;

  return totalUsersCount;
}

async function getUsersCountWeekChange() {
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  const twoWeeksAgo = new Date();
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

  const twoWeeksAgoUsersPromise = EntryModel.find({
    date: { $lte: twoWeeksAgo },
  })
    .distinct("userId")
    .exec();
  const weekAgoUsersPromise = EntryModel.find({ date: { $lte: weekAgo } })
    .distinct("userId")
    .exec();
  const allUsersPromise = EntryModel.find().distinct("userId").exec();

  const [twoWeeksAgoUsers, weekAgoUsers, allUsers] = await Promise.all([
    twoWeeksAgoUsersPromise,
    weekAgoUsersPromise,
    allUsersPromise,
  ]);

  const weekAgoGrowth = weekAgoUsers.length - twoWeeksAgoUsers.length;
  const todayGrowth = allUsers.length - weekAgoUsers.length;

  const weekToWeekChange =
    ((todayGrowth - weekAgoGrowth) / weekAgoGrowth) * 100;
  return weekToWeekChange.toFixed(2);
}

// TODO: remove this export object. export methods directly
//       its easier to jump to definition
export const entriesService = {
  saveRequestToDb,
  getTotalUrlsCount,
  getTotalUrlsCountWeekChange,
  getRecentUrls,
  getLastDaysUrlsCount,
  getUrlsCountPerDays,
  getTotalUsersCount,
  getUsersCountWeekChange,
};
