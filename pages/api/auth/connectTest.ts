import dbConnect from './dbConnect'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log('connecting...')
  await dbConnect()
  console.log('connected!')
  res.status(200).json({ name: 'hello' })
}
