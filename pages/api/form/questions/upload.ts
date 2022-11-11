import { NextApiRequest, NextApiResponse } from 'next'
import { WithId, Document, MongoClient } from 'mongodb'
import clientPromise from '../../../../server/_dbConnect'
import { unstable_getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]'
import { Question } from '../../../../models'
import csvToQuestionArray from '../../../../constants/csv_parser'
import isWellFormed from '../../../../utils/isWellFormed'

const dropIfExists = async (collection: string, client: MongoClient) => {
  return client
    .db('edlaw')
    .collections()
    .then(async (collections) => {
      if (collections.map((c) => c.collectionName).includes(collection)) {
        return client.db('edlaw').dropCollection(collection)
      }
    })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.status(400).json({ error: 'Expected POST request' })
    return
  }
  const session = await unstable_getServerSession(req, res, authOptions)
  if (!session?.user?.admin) {
    res.status(401).json({ error: 'Only admins may access this endpoint' })
    return
  }

  const file = req.body as string

  const questionsInfo = csvToQuestionArray(file, { stringified: true })
  const wellFormedResponse = isWellFormed(questionsInfo.questions)
  if (!wellFormedResponse.pass) {
    res.status(417).json({
      error: `CSV is not well-formed. ${wellFormedResponse.message()}`,
    })
    return
  }

  const client = await clientPromise
  if (!client) {
    res.status(500).json({ error: 'Client is not connected' })
    return
  }

  await Promise.all(
    ['form', 'questions', 'startingQuestion'].map((c) =>
      dropIfExists(c, client)
    )
  )

  const questionCollection = client.db('edlaw').collection('questions')
  const startingQuestionCollection = client
    .db('edlaw')
    .collection('startingQuestion')

  const result = await questionCollection.insertMany(questionsInfo.questions)
  const result2 = await startingQuestionCollection.insertOne({
    index: questionsInfo.startingQuestion,
  })

  try {
    await res.revalidate('/form')
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Error regenerating form page, please try again.' })
    return
  }

  if (result.acknowledged && result2.acknowledged) {
    res.status(200).json({ success: true })
  } else {
    res.status(401).json({ error: 'An error occurred while saving' })
  }
}
