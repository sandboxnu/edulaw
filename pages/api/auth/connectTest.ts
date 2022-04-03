import { dbConnect, getDB } from './dbConnect'
import * as mongoDB from 'mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'

// type Data = {
//   name: any
// }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log('connecting...')
  dbConnect()
  const db = getDB()
  console.log('connected!')
  const pet = await db.collection('pets').findOne()
  res.status(200).json({ pet: pet })
}
