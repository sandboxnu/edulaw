import { MongoKerberosError } from 'mongodb'
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from './dbConnect'
// import User from './model/User'
import mongoose from 'mongoose'

async function hello(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect()

  const userSchema = new mongoose.Schema({
    name: String,
  })

  const User = mongoose.models.User

  if (req.method === 'POST') {
    console.log('who asked')
    try {
      const user = await User.create({ name: 'Nick' })
      res.status(201).json({ success: true, data: user })
    } catch (error) {
      res.status(400).json({ success: false })
    }
  } else if (req.method == 'GET') {
    try {
      const users = await User.find({})
      res.status(200).json({ success: true, data: users })
    } catch (error) {
      res.status(400).json({ success: false })
    }
  }
}

export default hello
