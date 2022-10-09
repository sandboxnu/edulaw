/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '../../../server/_dbConnect'
import bcrypt from 'bcryptjs'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await clientPromise
  if (!client) {
    res.status(500).json({ error: 'Could not connect to client' })
    return null
  }

  const { email, password } = JSON.parse(req.body)

  const users = client.db('edlaw').collection('user')
  const exists = await users.findOne({ username: email })
  if (exists) {
    res.status(401).json({ error: 'User already exists' })
  } else {
    const salt = await bcrypt.genSalt(10)
    const hashPass = await bcrypt.hash(password, salt)
    const hashedUser = { username: email, hashPass, admin: false }
    const newUser = await users.insertOne(hashedUser)
    res.status(200).json({ id: newUser.insertedId })
  }
}
