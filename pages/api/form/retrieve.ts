import { NextApiRequest, NextApiResponse } from 'next'
import { FormAnswerDB } from './save'
import { dbConnect } from '../../../server/_dbConnect'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<FormAnswerDB | { error: string }>
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

  const client = await dbConnect()

  if (!client) {
    res.status(500).json({ error: 'Client is not connected' })
    return
  }
  const parsedUserID = parseInt(userID)
  await client.connect()
  const formCollection = client.db('edlaw').collection('form')
  const result = (await formCollection.findOne({
    userID: parsedUserID,
  })) as FormAnswerDB | null
  if (result) {
    res.status(200).json(result)
  } else {
    res.status(401).json({ error: 'User does not have saved formAnswer' })
  }
}
