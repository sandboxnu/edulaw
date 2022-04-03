import { MongoClient } from 'mongodb'
// Connection URI
const uri = 'mongodb://mongoadmin:secret@localhost:8080/?authSource=admin'

export const dbConnect = async (): Promise<MongoClient | undefined> => {
  try {
    const client = new MongoClient(uri)
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
