import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { FormTemplate } from '../../components/Critical/FormTemplate'
import Tooltip from '../../components/DynamicForm/Tooltip'
import Modal from '../../components/FormStyles/Modal'
import { InfoText, TitleText } from '../../components/FormStyles/QuestionText'
import { TextArea } from '../../components/FormStyles/TextArea'
import { ConcernDB } from '../api/form/concern/save'

const TooltipContainer = styled.div`
  margin-bottom: 8px;
`

const Concern: React.FC = () => {
  const [concern, setConcern] = useState<string | undefined>(undefined)
  const router = useRouter()
  const { data, status } = useSession()
  const [loaded, setLoaded] = useState<boolean>(true)

  const tooltipText = `This is the part where you're introducing the PRS officer to your concerns by telling them generally what happened.  

You don't have to be too specific here, because you'll add more information as we go through the questions.  At the end of the walkthrough, you can review the whole statement of concerns and add anything that's missing.  

The information is specific to your situation and concerns, but here are a few examples of what you might write based on hypothetical situations:

“The student was suspended from school but the school never told us exactly why.  Now she has been out of school for two weeks and hasn't been able to make up any work.  I'm concerned that she's falling behind, and the school won't help us figure out how she can make up her work.”  

“I asked the school to do a special education evaluation for the student in September and they still haven't done it.  His grades have dropped and the school isn't giving him the support he needs.”`

  // reroutes to signup if not logged in
  if (status === 'unauthenticated') {
    router.push('/signup')
  }

  // saves values to database
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

  // loads values in from database, only loads once
  useEffect(() => {
    const retrieve = async () => {
      if (!data?.user?.id || loaded) {
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
  return (
    <FormTemplate
      loaded={loaded}
      onSubmit={async (values, actions) => {
        await save()
        router.push('/form')
        actions.setSubmitting(false)
      }}
      onBack={() => router.push('/form/group')}
      currentPage="Concerns"
    >
      <div>
        <TitleText>Introducing your concern</TitleText>
        <InfoText>
          Before we start the questions, please briefly describe your concerns
          in the box below. The text that you write will be the first paragraph
          of your complaint. It will set the stage for the more specific
          information that we get through the questions.{' '}
        </InfoText>
        <TooltipContainer>
          <Tooltip
            tooltip={{
              tooltipText: 'What kind of information should I include?',
              tooltipHoveredText: tooltipText,
            }}
          />
        </TooltipContainer>
        <TextArea
          name="Concern"
          width={650}
          height={200}
          value={concern}
          placeholder="Describe here"
          onChange={(event) => {
            setConcern(event.target.value)
          }}
        />
      </div>
      <Modal />
    </FormTemplate>
  )
}

export default Concern
