import { NextApiRequest, NextApiResponse } from 'next'
import { getDB, dbConnect } from './dbConnect'

// export default async (req: NextApiRequest, res: NextApiResponse) => {
//     dbConnect()
//     const USERS = getDB()
//     if(req.method == 'POST') {
//         USERS.collection('user').insertOne(req.body());
//         res.status(200)
//     }
//   };
