import { NextApiRequest, NextApiResponse } from 'next'
import { DistrictDB } from './save'
import { dbConnect } from '../../../../server/_dbConnect'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DistrictDB | { error: string }>
) {
  if (req.method !== 'GET') {
    res.status(400).json({ error: 'Expected GET request' })
    return
  }

  const { userID } = req.query

  const client = await dbConnect()

  if (!client) {
    res.status(500).json({ error: 'Client is not connected' })
    return
  }
  await client.connect()
  const formCollection = client.db('edlaw').collection('district')
  const result = (await formCollection.findOne({
    userID: userID,
  })) as DistrictDB | null
  if (result) {
    res.status(200).json(result)
  } else {
    res.status(401).json({ error: 'User does not have saved formAnswer' })
  }
}
