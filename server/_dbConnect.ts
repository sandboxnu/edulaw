import { MongoClient } from 'mongodb'
// Connection URI
const prefix = process.env.NODE_ENV === 'development' ? '' : '+srv'
const root = process.env.MONGO_INITDB_ROOT_USERNAME
const pw = process.env.MONGO_INITDB_ROOT_PASSWORD
const host =
  process.env.NODE_ENV === 'development'
    ? 'localhost:8080'
    : process.env.MONGO_HOST
const uri = `mongodb${prefix}://${root}:${pw}@${host}`

// stolen from https://github.com/vercel/next.js/tree/canary/examples/with-mongodb

const client = new MongoClient(uri)
global._mongoClientPromise = client.connect()
const clientPromise = global._mongoClientPromise
  .then(async (client) => {
    await client.db('admin').command({ ping: 1 })
    return client
  })
  .catch((err) => {
    return undefined
  })

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise
