import { NextApiRequest, NextApiResponse } from 'next'
import { ContactInfoDb } from './save'
import clientPromise from '../../../../server/_dbConnect'
import { unstable_getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]'
import { decrypt } from '../../../../server/crypto'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ContactInfoDb | { error: string }>
) {
  if (req.method !== 'GET') {
    res.status(400).json({ error: 'Expected GET request' })
    return
  }

  const session = await unstable_getServerSession(req, res, authOptions)
  if (!session) {
    res.status(401).json({ error: 'You must be logged in.' })
    return
  }

  clientPromise
    .then(async (client) => {
      const formCollection = client.db('edlaw').collection('contact')
      const result = (await formCollection.findOne({
        userID: session.user?.id,
      })) as ContactInfoDb | null
      if (result) {
        const decrypted = result
        for (const key in result) {
          if (key === '_id' || key === 'userID') continue
          decrypted[key] = decrypt(result[key])
        }
        res.status(200).json(decrypted)
      } else {
        res.status(401).json({ error: 'User does not have saved formAnswer' })
      }
    })
    .catch((err) => {
      res.status(500).json({ error: 'Client is not connected' })
    })
}
