import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { LoadingSpinner } from '../components/LoadingSpinner'

const upload = async (file: File) => {
  await fetch('/api/form/questions/upload', {
    method: 'POST',
    body: file,
  })
}

const Admin = () => {
  const { data, status } = useSession()
  const router = useRouter()
  const [file, setFile] = useState<File | undefined>()

  if (status === 'loading') {
    return <LoadingSpinner />
  } else if (status === 'authenticated' && data?.user?.admin) {
    return (
      <div>
        <p>Upload csv below</p>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.item(0) || undefined)}
        />
        <button
          onClick={() => {
            if (file) {
              upload(file)
                .then(() => alert('Success'))
                .catch((err) => alert('Error'))
            }
          }}
        >
          Click to confirm
        </button>
      </div>
    )
  } else {
    router.push('/')
    return <LoadingSpinner />
  }
}

export default Admin