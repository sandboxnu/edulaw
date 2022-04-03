import { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient, WithId, Document } from 'mongodb'
import { FormAnswer } from '../../../utils/FormContext'

const client = new MongoClient(' ')

export interface FormAnswerDB extends WithId<Document> {
  userID: number
  formanswer: FormAnswer
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await client.connect()

  const doc: FormAnswerDB = req.body
  const formCollection = await client.db('edlaw').collection('form')
  const result = formCollection.updateOne({ userID: doc.userID }, doc, {
    upsert: true,
  })
  console.log(result)
}
