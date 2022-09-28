import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || 'PROVIDE_MONGO_URI';

async function connect() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.log(err);
  }
}

const EntryModel = mongoose.models.bibtexEntry || mongoose.model('bibtexEntry', new mongoose.Schema({
  date: Date,
  url: String,
}));

async function logRequest(url: any) {
  const itemObj = new EntryModel({
    date: Date.now(),
    url: url,
  });
  await itemObj.save();
}

async function closeConnection() {
  await mongoose.disconnect();
  console.log('MongoDB connection closed');
}

export const db = {
  connect: connect,
  logRequest: logRequest,
  closeConnection: closeConnection,
}