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

async function closeConnection() {
  await mongoose.disconnect();
  console.log('MongoDB connection closed');
}

export const db = {
  connect: connect,
  closeConnection: closeConnection,
}