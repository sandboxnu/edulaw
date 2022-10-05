import { MongoClient } from 'mongodb'
// Connection URI
const prefix = process.env.NODE_ENV === 'development' ? '' : '+srv'
const root = process.env.MONGO_INITDB_ROOT_USERNAME
const pw = process.env.MONGO_INITDB_ROOT_PASSWORD
const host =
  process.env.NODE_ENV === 'development'
    ? 'localhost:8080'
    : process.env.MONGO_HOST
const uri = `mongodb${prefix}://${root}:${pw}@${host}/?authSource=admin`

const client = new MongoClient(uri)

let connected = false

export const dbConnect = async (): Promise<MongoClient | undefined> => {
  if (connected) {
    return client
  }

  try {
    // Connect the client to the server
    await client.connect()
    // Establish and verify connection
    await client.db('user').command({ ping: 1 })
    connected = true
    return client
  } catch (error) {
    console.log(error)
    return undefined
  }
}
