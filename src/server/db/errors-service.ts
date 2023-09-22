import mongoose, { Schema, model } from "mongoose";
import { db } from "./db";

type ErrorLog = {
  date: Date;
  url: string;
  userId: string;
  message: string;
};

const errorLogSchema = new Schema<ErrorLog>({
  date: { type: Date, required: true },
  url: { type: String, required: true },
  userId: { type: String, required: true },
  message: { type: String, required: true }
});

const getModel = () => model("bibtexErrorLog", errorLogSchema);
const ErrorLogModel =
  (mongoose.models.bibtexErrorLog as ReturnType<typeof getModel>) ||
  model<ErrorLog>("bibtexErrorLog", errorLogSchema);

type NewErrorLog = {
  url: string;
  userId: string;
  message: string;
};

//
// Commands
//
async function createErrorLogEntry({ url, userId, message }: NewErrorLog) {
  const itemObj = new ErrorLogModel({
    date: Date.now(),
    url: url,
    userId: userId,
    message: message,
  });
  await itemObj.save();
}

export const saveErrorLogToDb = async ({ url, userId, message }: NewErrorLog) => {
  await db.connect();
  await createErrorLogEntry({ url: url, userId: userId, message: message });

  return;
};

export const removeErrorsForUser = async ({userId}: {userId: string}) => {
    await db.connect();
    await ErrorLogModel.deleteMany({ userId: userId}).exec();

    return;
}

//
// Queries
//
export async function getTotalErrorsCount() {
  await db.connect();
  const totalUrlsCount = await ErrorLogModel.find().countDocuments().exec();

  return totalUrlsCount;
}

export async function getErrorsCountWeekChange() {
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 7);

  const twoWeeksAgo = new Date();
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

  const twoWeeksAgoCountPromise = ErrorLogModel.countDocuments({
    date: { $lte: twoWeeksAgo },
  }).exec();
  const weekAgoCountPromise = ErrorLogModel.countDocuments({
    date: { $lte: weekAgo },
  }).exec();
  const todayCountPromise = ErrorLogModel.find().countDocuments().exec();

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

export async function getRecentErrors() {
  await db.connect();
  const recentErrors = await ErrorLogModel.find().sort({ date: -1 }).limit(5).exec();

  return recentErrors;
}

export async function getLastDaysErrorsCount(numOfDays = 7) {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - numOfDays);

  await db.connect();
  const urlsCount = await ErrorLogModel.countDocuments({
    date: { $gte: sevenDaysAgo },
  }).exec();

  return urlsCount;
}
