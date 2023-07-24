import mongoose from 'mongoose';
import { db } from './db';

const EntryModel = mongoose.models.bibtexEntry || mongoose.model('bibtexEntry', new mongoose.Schema({
  date: Date,
  url: String,
}));

async function createLogEntry(url: any) {
  const itemObj = new EntryModel({
    date: Date.now(),
    url: url,
  });
  await itemObj.save();
}

export const saveRequestToDb = async (url: string) => {
  await db.connect();
  await createLogEntry(url);
  await db.closeConnection();

  return;
}
