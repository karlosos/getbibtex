import mongoose, { Schema, model} from 'mongoose';
import { db } from './db';
// import mongoose from 'mongoose';

type Entry = {
  date: Date,
  url: string,
}

const entrySchema = new Schema<Entry>({
  date: { type: Date, required: true },
  url: { type: String, required: true }
});

// Old schema:
// const EntryModel = mongoose.models.bibtexEntry || mongoose.model('bibtexEntry', new mongoose.Schema({
//   date: Date,
//   url: String,
// }));

// TODO: this mongoose.models.bibtexEntry causes problem with typescript
// const EntryModel = mongoose.models.bibtexEntry || model<Entry>('bibtexEntry', entrySchema)
const EntryModel = model<Entry>('bibtexEntry', entrySchema)

async function createLogEntry(url: string) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const itemObj = new EntryModel({
    date: Date.now(),
    url: url,
  });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  await itemObj.save();
}

const saveRequestToDb = async (url: string) => {
  await db.connect();
  await createLogEntry(url);
  await db.closeConnection();

  return;
}

async function getTotalUrlsCount() {
  await db.connect();
  const totalUrlsCount = await EntryModel.countDocuments();
  await db.closeConnection();

  return totalUrlsCount;
}

async function getRecentUrls() {
  await db.connect();
  const recentUrls = await EntryModel.find().sort({ date: -1 }).limit(5);
  await db.closeConnection();

  return recentUrls;
}

async function getLastDaysUrlsCount(numOfDays=7) {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - numOfDays);

  await db.connect();
  const urlsCount = await EntryModel.countDocuments({ date: { $gte: sevenDaysAgo }});
  await db.closeConnection();

  return urlsCount;
}

export const bookkeepingService = {
  saveRequestToDb: saveRequestToDb,
  getTotalUrlsCount: getTotalUrlsCount,
  getRecentUrls: getRecentUrls,
  getLastDaysUrlsCount: getLastDaysUrlsCount,
}