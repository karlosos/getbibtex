import type { NextApiRequest, NextApiResponse } from 'next'
import { getCitation } from '../../server/generateCitation'
import { logRequestToDb } from '../../server/logger';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let { url } = req.body

  if (url === undefined) {
    res.status(400).json({ message: 'URL cannot be empty' });
    return;
  }

  if (typeof url !== 'string') {
    res.status(400).json({ message: 'URL must be a string' });
    return;
  }

  const logging = logRequestToDb(url);

  const { bibtex, entryData } = await getCitation(url);

  res.status(200).json({entryData: entryData, bibtex: bibtex});
  await logging;
}
