import { dbConnect } from './dbConnect'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('connecting...')
  const client = await dbConnect()
  if (!client) res.status(500)
  console.log('connected!')
  const pet = await client?.db().collection('pets').findOne()
  res.status(200).json({ pet: pet })
}
