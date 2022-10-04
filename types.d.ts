import type { DefaultUser } from 'next-auth'

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
