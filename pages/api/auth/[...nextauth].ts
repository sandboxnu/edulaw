import NextAuth from 'next-auth'
import CredentialProvider from 'next-auth/providers/credentials'
import { getDB, dbConnect } from './dbConnect'

/* eslint-disable */
export default NextAuth({
  providers: [
    CredentialProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Email', type: 'text', placeholder: '@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials: any, req) => {
        console.log(credentials)
        console.log('running dbConnect...')
        await dbConnect()
        const db = getDB()
        console.log('dbConnect ran')
        const existingUser = await db
          .collection('user')
          .findOne({ username: credentials.username })
        console.log(existingUser)
        if (existingUser) {
          if (existingUser.password == credentials.password) {
            console.log('user existed')
            return existingUser
          }
        } else {
          console.log("user doesn't exist")
          return null
        }

        // "database" look up
        // if (
        //   credentials.username === 'aoun@gmail.com' &&
        //   credentials.password === 'husky'
        // ) {
        //   return {
        //     id: 2,
        //     name: 'Aoun',
        //     email: 'aoun@gmail.com',

        // login failed
        return null
      },
    }),
  ],
  // callbacks: {
  //   async signIn({ user, profile}) {
  //   const isAllowedToSignIn = true

  //   if (isAllowedToSignIn) {
  //     dbConnect()
  //     const db = getDB()
  //       const existingUser = db.collection('user').findOne({username: user.username})
  //       console.log(existingUser)
  //       if(existingUser) {
  //         if(existingUser.password == user.password){
  //           console.log("user existed")
  //           return existingUser;
  //         }
  //       } else{
  //         console.log("user doesn't exist")
  //         return null
  //       }
  //     return true
  //   } else {
  //     // Return false to display a default error message
  //     return false
  //     // Or you can return a URL to redirect to:
  //     // return '/unauthorized'
  //   }
  // }
})

/* eslint-enable */
