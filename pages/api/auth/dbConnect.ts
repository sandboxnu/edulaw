import * as mongoDB from 'mongodb'
import * as dotenv from 'dotenv'
// Connection URI
const uri = 'mongodb://nextDev:sandboxpass@127.0.0.1:27017/?authSource=admin'
// Create a new MongoClient
const client = new mongoDB.MongoClient(uri)
async function dbConnect() {
  try {
    // Connect the client to the server
    await client.connect()
    // Establish and verify connection
    await client.db('admin').command({ ping: 1 })
    const pet = await client.db('test').collection('pets').findOne()
    console.log('Connected successfully to server')
    console.log(pet)
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
export default dbConnect

// import mongoose from 'mongoose'

// const connection = { isConnected: {} }

// async function dbConnect() {
//   if (connection.isConnected) {
//     return
//   }

//   const db = await mongoose.connect(
//     'mongodb://nextDev:sandboxpass@127.0.0.1:27017/?authSource=admin'
//   )
//   connection.isConnected = db.connections[0].readyState
// }

// export default dbConnect

// import mongoose from 'mongoose'

// const MONGODB_URI = process.env.MONGODB_URI

// if (!MONGODB_URI) {
//   throw new Error(
//     'Please define the MONGODB_URI environment variable inside .env.local'
//   )
// }

// /**
//  * Global is used here to maintain a cached connection across hot reloads
//  * in development. This prevents connections growing exponentially
//  * during API Route usage.
//  */
// let cached = global.mongoose

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null }
// }

// async function dbConnect() {
//   if (cached.conn) {
//     return cached.conn
//   }

//   if (!cached.promise) {
//     const opts = {
//       bufferCommands: false,
//     }

//     cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
//       return mongoose
//     })
//   }
//   cached.conn = await cached.promise
//   return cached.conn
// }

// export default dbConnect
