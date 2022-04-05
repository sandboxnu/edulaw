import { MongoClient } from 'mongodb'
// Connection URI
const uri = `mongodb://${process.env.MONGO_INITDB_ROOT_USERNAME}:${process.env.MONGO_INITDB_ROOT_PASSWORD}@localhost:8080/?authSource=admin`

const client = new MongoClient(uri)

export const dbConnect = async (): Promise<MongoClient | undefined> => {
  try {
    console.log(uri)
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
