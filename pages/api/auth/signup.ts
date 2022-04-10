/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next'
import { dbConnect } from '../../../server/_dbConnect'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await dbConnect()
  if (!client) {
    res.status(500).json({ error: 'Could not connect to client' })
    return null
  }

  console.log(req.body)
  const { email, password } = JSON.parse(req.body)

  const users = client.db().collection('user')
  const exists = await users.findOne({ username: email })
  if (exists) {
    res.status(401).json({ error: 'User already exists' })
  } else {
    const newUser = await users.insertOne({
      username: email,
      password: password,
    })
    res.status(200).json({ id: newUser.insertedId })
  }
  await client.close()
}
