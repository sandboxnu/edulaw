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

let client
let clientPromise: Promise<MongoClient>

if (process.env.NODE_ENV === 'development') {
  // In development mode, use a global variable so that the value
  // is preserved across module reloads caused by HMR (Hot Module Replacement).
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri)
    global._mongoClientPromise = client.connect()
  }
  clientPromise = global._mongoClientPromise
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri)
  clientPromise = client.connect()
}

// Export a module-scoped MongoClient promise. By doing this in a
// separate module, the client can be shared across functions.
export default clientPromise
