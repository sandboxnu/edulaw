import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { InfoText, TitleText } from '../../components/FormStyles/QuestionText'
import { ConcernDB } from '../api/form/concern/save'

const Concern: React.FC = () => {
  const [concern, setConcern] = useState<string | undefined>(undefined)
  const router = useRouter()
  const { data, status } = useSession()
  const [loaded, setLoaded] = useState<boolean>(true)

  // reroutes to signup if not logged in
  // if (status === 'unauthenticated') {
  //   router.push('/signup')
  // }

  // saves values to database
  useEffect(() => {
    const save = async () => {
      if (!data?.user?.id) {
        return
      }
      const userID = data.user.id
      const body: Omit<ConcernDB, '_id'> = {
        userID: userID,
        concern: concern,
      }
      const result = await fetch('/api/form/concern/save', {
        method: 'POST',
        body: JSON.stringify(body),
      })
      const resBody = await result.json()
      if (result.status !== 200) {
        console.error(resBody.error)
      }
    }
    save()
  }, [concern])

  // loads values in from database, only loads once
  useEffect(() => {
    const retrieve = async () => {
      if (!data?.user?.id) {
        return
      }
      const userID = data.user.id
      const result = await fetch(`/api/form/concern/retrieve?userID=${userID}`)
      const body = await result.json()
      if (result.status !== 200) {
        console.error(body.error)
      } else {
        const typedBody = body as ConcernDB
        setConcern(typedBody.concern)
      }
      setLoaded(true)
    }
    if (!loaded) {
      retrieve()
    }
  }, [data])

  return !loaded ? (
    <p>loading...</p>
  ) : (
    <div>
      <TitleText>Introducing your concern</TitleText>
      <InfoText>
        Before we start the questions, please briefly describe your concerns in
        the box below. The text that you write will be the first paragraph of
        your complaint. It will set the stage for the more specific information
        that we get through the questions.{' '}
      </InfoText>
      <input
        name="Concern"
        value={concern}
        onChange={(event) => {
          setConcern(event.target.value)
        }}
      />
    </div>
  )
}

export default Concern
