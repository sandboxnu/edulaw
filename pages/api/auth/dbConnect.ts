import * as mongoDB from 'mongodb'
// Connection URI
const uri = 'mongodb://nextDev:sandboxpass@127.0.0.1:27017/?authSource=admin'
// Create a new MongoClient
const client = new mongoDB.MongoClient(uri)

let db: mongoDB.Db

export const dbConnect = async () => {
  try {
    // Connect the client to the server
    await client.connect()
    // Establish and verify connection
    await client.db('admin').command({ ping: 1 })
    db = client.db('test')
    // const pet = await client.db('test').collection('pets').findOne()
    console.log('Connected successfully to server')
    // console.log(pet)
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close()
  }
}

export const getDB = () => {
  return db
}
