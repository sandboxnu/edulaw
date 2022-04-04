import { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient, WithId, Document } from 'mongodb'
import { FormValues } from '../../../utils/FormContext'

const client = new MongoClient(
  'mongodb://mongoadmin:secret@localhost:8080/?authSource=admin'
)

export interface FormAnswerDB extends WithId<Document> {
  userID: number
  formAnswers: FormValues
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await client.connect()

  const doc: FormAnswerDB = req.body
  const formCollection = await client.db('edlaw').collection('form')
  const result = await formCollection.replaceOne({ userID: doc.userID }, doc, {
    upsert: true,
  })
  console.log(result.modifiedCount)
  if (result.acknowledged) {
    res.status(200).json({ success: true })
  } else {
    res.status(401).json({ error: 'An error occurred while saving' })
  }
}
