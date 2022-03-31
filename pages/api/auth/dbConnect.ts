import mongoose from 'mongoose'

const connection = { isConnected: {} }

async function dbConnect() {
  if (connection.isConnected) {
    return
  }

  const db = await mongoose.connect(
    'mongodb://nextDev:sandboxpass@127.0.0.1:27017/?authSource=admin'
  )
  connection.isConnected = db.connections[0].readyState
}

export default dbConnect
