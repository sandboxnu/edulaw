import NextAuth from 'next-auth'
import CredentialProvider from 'next-auth/providers/credentials'
import { dbConnect } from '../../../server/_dbConnect'

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
        console.log(credentials)
        console.log('running dbConnect...')
        const client = await dbConnect()
        if (!client) {
          console.log('no client')
          return null
        }
        console.log('connected')
        const existingUser = await client.db().collection('user').findOne({
          username: credentials.username,
          password: credentials.password,
        })
        if (existingUser) {
          console.log('user existed')
          client?.close()
          return { id: existingUser._id }
        } else {
          console.log("user doesn't exist")
          client?.close()
          throw new Error('User does not exist')
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
})

/* eslint-enable */
