import NextAuth from 'next-auth'
import CredentialProvider from 'next-auth/providers/credentials'

export default NextAuth({
  providers: [
    CredentialProvider({
      credentials: {
        username: { label: 'Email', type: 'text', placeholder: '@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: (credentials: any) => {
        // "database" look up
        if (
          credentials.username === 'aoun@gmail.com' &&
          credentials.password === 'husky'
        ) {
          return {
            id: 2,
            name: 'Aoun',
            email: 'aoun@gmail.com',
          }
        }
        // login failed
        return null
      },
    }),
  ],
})
