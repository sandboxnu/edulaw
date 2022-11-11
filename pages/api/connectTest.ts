import clientPromise from '../../server/_dbConnect'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await clientPromise
  if (!client) {
    res.status(500).json({ error: 'Client did not connect' })
  } else {
    res.status(200).json({ success: 'Client connected successfully' })
  }
}
