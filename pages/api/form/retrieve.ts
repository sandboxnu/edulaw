import { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient } from 'mongodb'
import { FormValues } from '../../../utils/FormContext'
import { FormAnswerDB } from './save'
import { RestartAlt } from '@mui/icons-material'

const client = new MongoClient(
  'mongodb://mongoadmin:secret@localhost:8080/?authSource=admin'
)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<FormValues | { error: string }>
) {
  if (req.method !== 'GET') {
    res.status(400).json({ error: 'Expected GET request' })
    return
  }

  const { userID } = req.query
  if (typeof userID !== 'string' || Number.isNaN(Number(userID))) {
    res.status(400).json({ error: 'UserID is malformed' })
    return
  }

  const parsedUserID = parseInt(userID)
  await client.connect()
  const formCollection = client.db('edlaw').collection('form')
  const result = (await formCollection.findOne({
    userID: parsedUserID,
  })) as FormAnswerDB | null
  console.log(result)
  if (result) {
    res.status(200).json(result.formAnswers)
  } else {
    res.status(401).json({ error: 'User does not have saved formAnswer' })
  }
}
