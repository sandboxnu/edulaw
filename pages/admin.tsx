import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import styled from 'styled-components'
import { LoadingSpinner } from '../components/LoadingSpinner'

const CenterDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 20%;
  width: 20%;
  margin: auto;
  margin-top: 5%;
  gap: 20px;
`

const upload = async (file: File) => {
  const text = await file.text()
  fetch('/api/form/questions/upload', {
    method: 'POST',
    body: text,
  }).then(async (response) => {
    if (response.ok) {
      alert('Success')
    } else {
      const { error } = await response.json()
      alert(`Error ${response.status}: ${error}`)
    }
  })
}

const Admin = () => {
  const { data, status } = useSession()
  const router = useRouter()
  const [file, setFile] = useState<File | undefined>()
  const [loading, setLoading] = useState(false)

  if (status === 'loading' || loading) {
    return <LoadingSpinner />
  } else if (status === 'authenticated' && data?.user?.admin) {
    return (
      <CenterDiv>
        <p>Upload csv below</p>
        <input
          type="file"
          accept="text/csv"
          onChange={(e) => setFile(e.target.files?.item(0) || undefined)}
        />
        <button
          onClick={async () => {
            if (
              file &&
              confirm(
                "Are you sure you want to upload a new file? Note that this will delete existing users' answers if successful."
              )
            ) {
              setLoading(true)
              await upload(file)
              setLoading(false)
            }
          }}
        >
          Click to confirm upload
        </button>
      </CenterDiv>
    )
  } else {
    router.push('/')
    return <LoadingSpinner />
  }
}

export default Admin
