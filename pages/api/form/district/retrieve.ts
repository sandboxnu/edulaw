import { NextApiRequest, NextApiResponse } from 'next'
import { DistrictDB } from './save'
import { dbConnect } from '../../../../server/_dbConnect'
import { unstable_getServerSession } from 'next-auth'
import { authOptions } from '../../auth/[...nextauth]'
import { decrypt } from '../../../../server/crypto'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DistrictDB | { error: string }>
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
  const formCollection = client.db('edlaw').collection('district')
  const result = (await formCollection.findOne({
    userID: session.user?.id,
  })) as DistrictDB | null
  if (result) {
    res.status(200).json({
      ...result,
      district: decrypt(result.district),
      school: decrypt(result.school),
    })
  } else {
    res.status(401).json({ error: 'User does not have saved formAnswer' })
  }
}
