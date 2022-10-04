import { NextApiRequest, NextApiResponse } from 'next'
import { WithId, Document, RegExpOrString } from 'mongodb'
import { FormAnswer, FormValues } from '../../../utils/FormContext'
import { dbConnect } from '../../../server/_dbConnect'
import { Question } from '../../../models'

export interface FormAnswerDB extends WithId<Document> {
  userID: string
  formValues: FormValues
  questionHistory: Question[]
  currentAnswer: FormAnswer
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.status(400).json({ error: 'Expected POST request' })
    return
  }

  const doc = JSON.parse(req.body) as Omit<FormAnswerDB, '_id'>
  const client = await dbConnect()
  if (!client) {
    res.status(500).json({ error: 'Client is not connected' })
    return
  }
  await client.connect()
  const formCollection = await client.db('edlaw').collection('form')
  const result = await formCollection.replaceOne({ userID: doc.userID }, doc, {
    upsert: true,
  })
  if (result.acknowledged) {
    res.status(200).json({ success: true })
  } else {
    res.status(401).json({ error: 'An error occurred while saving' })
  }
}
