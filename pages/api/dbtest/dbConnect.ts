import mongoose from 'mongoose'

const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

async function dbConnect() {
  console.log('connecting...')
  return mongoose
  console.log('connected!')
}

export default dbConnect
