import type { DefaultUser } from 'next-auth'
import { MongoClient } from 'mongodb'

declare module 'next-auth' {
  interface User extends DefaultUser {
    id: string
    admin: boolean
  }
  interface Session {
    user?: User
  }
}

declare module 'next-auth/jwt/types' {
  interface JWT {
    uid: string
    admin: boolean
  }
}

declare global {
  // eslint-disable-next-line
  var _mongoClientPromise: Promise<MongoClient>
}
