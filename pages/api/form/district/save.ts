import { NextApiRequest, NextApiResponse } from 'next'
import { WithId, Document } from 'mongodb'
import clientPromise from '../../../../server/_dbConnect'
import { unstable_getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]'
import { encrypt } from '../../../../server/crypto'

export interface DistrictDB extends WithId<Document> {
  district: string
  school: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.status(400).json({ error: 'Expected POST request' })
    return
  }

  const doc = JSON.parse(req.body) as Omit<DistrictDB, '_id'>
  const client = await clientPromise
  if (!client) {
    res.status(500).json({ error: 'Client is not connected' })
    return
  }

  const session = await unstable_getServerSession(req, res, authOptions)
  if (!session) {
    res.status(401).json({ error: 'You must be logged in.' })
    return
  }
  const formCollection = client.db('edlaw').collection('district')
  const result = await formCollection.replaceOne(
    { userID: session.user?.id },
    {
      ...doc,
      district: encrypt(doc.district),
      school: encrypt(doc.school),
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
