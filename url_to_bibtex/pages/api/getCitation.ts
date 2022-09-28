import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../server/db';
import { getCitation } from '../../server/generateCitation'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let { url } = req.body

  if (url === undefined) {
    res.status(500).json({ message: 'URL cannot be empty' }); // TODO: change status code
    return;
  }

  if (typeof url !== 'string') {
    res.status(500).json({ message: 'URL must be a string' }); // TODO: change status code
    return;
  }

  const logging = logRequestToDb(url);

  const { bibtex, entryData } = await getCitation(url);

  res.status(200).json({entryData: entryData, bibtex: bibtex});
  await logging;
}

const logRequestToDb = async (url: string) => {
  await db.connect();
  await db.logRequest(url);
  await db.closeConnection();

  return;
}