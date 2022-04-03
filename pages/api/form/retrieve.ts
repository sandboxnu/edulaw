import { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient } from 'mongodb'
import { FormAnswer } from '../../../utils/FormContext'
import { FormAnswerDB } from './save'
const client = new MongoClient(' ')

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<FormAnswer>
) {
  await client.connect()

  const userID: number = req.body.userID
  const formCollection = await client.db('edlaw').collection('form')

  const result = (await formCollection.findOne({
    userID: userID,
  })) as FormAnswerDB
  console.log(result)
  return result.formanswer
}
