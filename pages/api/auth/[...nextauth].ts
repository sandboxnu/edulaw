import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialProvider from 'next-auth/providers/credentials'
import { dbConnect } from '../../../server/_dbConnect'
import bcrypt from 'bcryptjs'
import type { WithId, Document } from 'mongodb'

/* eslint-disable */

const signinUser = async (user: WithId<Document>, pwd: string) => {
  if (!user.hashPass) {
    throw new Error('Please enter password')
  }
  const isMatch = await bcrypt.compare(pwd, user.hashPass)

  if (!isMatch) {
    throw new Error('Invalid Credentials')
  }
  return user
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  providers: [
    CredentialProvider({
      name: 'Credentials',
      id: 'credentials',
      credentials: {
        username: { label: 'Email', type: 'text', placeholder: '@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials, req) => {
        if (!credentials) throw new Error('No credentials provided')
        const client = await dbConnect()
        if (!client) {
          return { name: 'Internal Server Error' }
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
          return { name: 'Invalid Credentials' }
        }
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      if (session.user) {
        session.user.id = token.uid
      }
      return session
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id
      }
      return token
    },
  },
  pages: {
    signIn: '/signin',
  },
}

export default NextAuth(authOptions)

/* eslint-enable */
