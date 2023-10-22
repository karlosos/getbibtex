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
  await createErrorLogEntry({ url: url, userId: userId, message: message });

  return;
};

export const removeErrorsForUser = async ({userId}: {userId: string}) => {
    await ErrorLogModel.deleteMany({ userId: userId}).exec();

    return;
}

//
// Queries
//
export async function getErrors() {
  const errors = await ErrorLogModel.find().sort({ date: -1 }).limit(50).exec();

  return errors;
}

export async function getTotalErrorsCount() {
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
  const recentErrors = await ErrorLogModel.find().sort({ date: -1 }).limit(5).exec();

  return recentErrors;
}

export async function getLastDaysErrorsCount(numOfDays = 7) {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - numOfDays);

  const urlsCount = await ErrorLogModel.countDocuments({
    date: { $gte: sevenDaysAgo },
  }).exec();

  return urlsCount;
}

export async function getErrorsCountPerDays() {
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
    const count = await ErrorLogModel.countDocuments({
      date: { $lte: dates[i - 1]!, $gte: dates[i]! },
    }).exec();
    result.push({
      date: dates[i]!,
      count: count,
    });
  }

  return result;
}