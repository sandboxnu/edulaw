import { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient } from 'mongodb'
import { FormValues } from '../../../utils/FormContext'
import { FormAnswerDB } from './save'

const client = new MongoClient(
  'mongodb://mongoadmin:secret@localhost:8080/?authSource=admin'
)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<FormValues | { error: string }>
) {
  await client.connect()
  const userID: number = req.body.userID
  const formCollection = client.db('edlaw').collection('form')

  const result = (await formCollection.findOne({
    userID: userID,
  })) as FormAnswerDB | null
  console.log(result)
  if (result) {
    res.status(200).json(result.formAnswers)
  } else {
    res.status(401).json({ error: 'User does not have saved formAnswer' })
  }
}
