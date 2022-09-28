import { db } from "./db";

export const logRequestToDb = async (url: string) => {
  await db.connect();
  await db.logRequest(url);
  await db.closeConnection();

  return;
}