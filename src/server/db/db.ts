import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI || 'PROVIDE_MONGO_URI';

let connection: Promise<typeof mongoose> | null = null;

async function connect() {
  try {
    if (connection === null) {
      connection = mongoose.connect(MONGO_URI);
      console.log('Connecting to MongoDB');
    } 
    await connection;
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