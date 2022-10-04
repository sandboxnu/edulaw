import { NextApiRequest, NextApiResponse } from 'next'
import { dbConnect } from '../../../../server/_dbConnect'
import { unstable_getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]'
import { Question } from '../../../../models'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    { questions: Question[]; startingQuestion: number } | { error: string }
  >
) {
  if (req.method !== 'GET') {
    res.status(400).json({ error: 'Expected GET request' })
    return
  }

  const client = await dbConnect()

  if (!client) {
    res.status(500).json({ error: 'Client is not connected' })
    return
  }
  await client.connect()
  const session = await unstable_getServerSession(req, res, authOptions)
  if (!session) {
    res.status(401).json({ error: 'You must be logged in.' })
    return
  }
  const formCollection = client.db('edlaw').collection('questions')
  const startingQuestionCollection = client
    .db('edlaw')
    .collection('startingQuestion')

  const result = (await formCollection
    .find()
    .toArray()) as unknown as Question[]
  const result2 = (await startingQuestionCollection.findOne()) as unknown as {
    index: number
  }

  if (result && result2) {
    res.status(200).json({ questions: result, startingQuestion: result2.index })
  } else {
    res.status(401).json({ error: 'User does not have saved formAnswer' })
  }
}
