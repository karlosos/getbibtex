import mongoose from 'mongoose';
import { db } from './db';

const EntryModel = mongoose.models.bibtexEntry || mongoose.model('bibtexEntry', new mongoose.Schema({
  date: Date,
  url: String,
}));

async function createLogEntry(url: string) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const itemObj = new EntryModel({
    date: Date.now(),
    url: url,
  });
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  await itemObj.save();
}

export const saveRequestToDb = async (url: string) => {
  await db.connect();
  await createLogEntry(url);
  await db.closeConnection();

  return;
}
