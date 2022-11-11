import { Session } from 'next-auth'

const isSignedIn = ({
  data,
  status,
}: {
  data: Session | null
  status: 'loading' | 'unauthenticated' | 'authenticated'
}): boolean | 'loading' => {
  if (status === 'loading') {
    return 'loading'
  } else {
    return status === 'authenticated' && typeof data?.user?.id === 'string'
  }
}

export default isSignedIn
