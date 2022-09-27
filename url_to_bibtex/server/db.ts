const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;

async function connect() {
  try {
    await mongoose.connect(MONGO_URI, {useNewUrlParser: true});
    console.log('MongoDB connected');
  } catch (err) {
    console.log(err);
  }
}

const EntryModel = mongoose.models.bibtexEntry || mongoose.model('bibtexEntry', new mongoose.Schema({
  date: Date,
  url: String,
})); // TODO: fix creating model?

async function logRequest(url: any) {
  const itemObj = new EntryModel({
    date: Date.now(),
    url: url,
  });
  await itemObj.save();
}

async function closeConnection() {
  console.log('MongoDB closed connection');
  await mongoose.disconnect();
}

export const db = {
  connect: connect,
  logRequest: logRequest,
  closeConnection: closeConnection,
}