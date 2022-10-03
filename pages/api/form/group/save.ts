import { NextApiRequest, NextApiResponse } from 'next'
import { WithId, Document } from 'mongodb'
import { dbConnect } from '../../../../server/_dbConnect'
import { unstable_getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]'
import { encrypt } from '../../../../server/crypto'

export interface GroupDB extends WithId<Document> {
  studentOrGroup: string
  specialCircumstances: Array<boolean>
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.status(400).json({ error: 'Expected POST request' })
    return
  }

  const doc = JSON.parse(req.body) as Omit<GroupDB, '_id'>
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
  const formCollection = client.db('edlaw').collection('group')
  const result = await formCollection.replaceOne(
    { userID: session.user?.id },
    {
      ...doc,
      studentOrGroup: encrypt(doc.studentOrGroup),
      userID: session.user?.id,
    },
    {
      upsert: true,
    }
  )
  if (result.acknowledged) {
    res.status(200).json({ success: true })
  } else {
    res.status(401).json({ error: 'An error occurred while saving' })
  }
}
