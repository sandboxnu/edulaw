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

export const dbConnect = async (): Promise<MongoClient | undefined> => {
  try {
    // Connect the client to the server
    await client.connect()
    // Establish and verify connection
    await client.db('admin').command({ ping: 1 })
    // const pet = await client.db('test').collection('pets').findOne()
    console.log('Connected successfully to server')
    return client
    // console.log(pet)
  } catch (error) {
    console.log(error)
    return undefined
    // Ensures that the client will close when you finish/error
    // await client.close()
  }
}
