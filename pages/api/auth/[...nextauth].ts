import NextAuth from 'next-auth'
import CredentialProvider from 'next-auth/providers/credentials'
import { dbConnect } from '../../../server/_dbConnect'
import bcrypt from 'bcryptjs'
import type { WithId, Document } from 'mongodb'

/* eslint-disable */
export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Email', type: 'text', placeholder: '@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials, req) => {
        if (!credentials) throw new Error('no credentials provided')
        const client = await dbConnect()
        if (!client) {
          return null
        }
        const existingUser = await client.db().collection('user').findOne({
          username: credentials.username,
        })
        if (existingUser) {
          signinUser(existingUser, credentials.password)
          client?.close()
          return { id: existingUser._id }
        } else {
          client?.close()
          throw new Error('User does not exist')
        }
      },
    }),
  ],
})

const signinUser = async (user: WithId<Document>, pwd: string) => {
  if (!user.hashPass) {
    throw new Error('Please enter password')
  }
  const isMatch = await bcrypt.compare(pwd, user.hashPass)

  if (!isMatch) {
    throw new Error('Password Incorrect')
  }
  return user
}
/* eslint-enable */
