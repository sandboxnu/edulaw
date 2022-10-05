import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import styled from 'styled-components'
import { LoadingSpinner } from '../components/LoadingSpinner'

const CenterDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-center;
  margin: auto;
  gap: 20px;
`

const upload = async (file: File) => {
  const text = await file.text()
  fetch('/api/form/questions/upload', {
    method: 'POST',
    body: text,
  }).then((response) => {
    if (response.ok) {
      alert('Success')
    } else {
      alert(`Error ${response.status}`)
    }
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
      <CenterDiv>
        <p>Upload csv below</p>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.item(0) || undefined)}
        />
        <button
          onClick={() => {
            if (
              file &&
              confirm(
                "Are you sure you want to upload a new file? Note that this will delete existing user's answers if successful."
              )
            ) {
              upload(file)
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
