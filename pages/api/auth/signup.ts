import { NextApiRequest, NextApiResponse } from 'next'
import { dbConnect } from './dbConnect'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await dbConnect()
  if (!client) {
    res.status(500)
    return null
  }

  const { username, password } = req.body

  const users = client.db().collection('user')
  const exists = await users.findOne({ username: username })
  if (exists) {
    res.status(401).json({ error: 'User already exists' })
    return
  }
  const newUser = await users.insertOne(req.body)
  res.status(200).json({ id: newUser.insertedId })
}
