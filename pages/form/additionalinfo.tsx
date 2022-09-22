//import { CheckBoxOutlineBlankOutlined } from '@mui/icons-material'
import { MenuItem, Select } from '@material-ui/core'
import RadioGroup from '@mui/material/RadioGroup'
import { DropDownMenu } from 'material-ui'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { FormTemplate } from '../../components/Critical/FormTemplate'
import { MyRadio } from '../../components/DynamicForm/MyRadio'
import Tooltip from '../../components/DynamicForm/Tooltip'
import { TitleText, InfoText } from '../../components/FormStyles/QuestionText'
import { RadioButton } from '../../components/FormStyles/RadioButton'
import { TextArea } from '../../components/FormStyles/TextArea'
import { COLORS } from '../../constants/colors'
import { AdditionalInfoDb } from '../api/form/additionalinfo/save'
import { FormContainer } from './contactinfo'

export const StyledSelect = styled(Select)`
  & {
    border-color: ${COLORS.SHADOW_GREY};
    background-color: ${COLORS.LIGHT_GREY};
    color: ${COLORS.TEXT_GREY};
  }
`

const relationships = [
  'Student',
  'Parent or Legal Guardian',
  'Special Education Surrogate',
  'School Employee',
  'Other',
]

const AdditionalInfo: React.FC = () => {
  const [language, setLanguage] = useState<string>('')
  const [relationship, setRelationship] = useState<string | undefined>(
    undefined
  )
  const [deseAccommodations, setDeseAccommodations] = useState<string>('')
  const [bsea, setBsea] = useState<boolean>(false)
  const router = useRouter()
  const { data, status } = useSession()
  const [loaded, setLoaded] = useState<boolean>(true)

  // reroutes to signup if not logged in

  if (status === 'unauthenticated') {
    router.push('/signup')
  }

  // saves values to database
  useEffect(() => {
    const save = async () => {
      if (!data?.user?.id) {
        return
      }
      const userID = data.user.id
      const body: Omit<AdditionalInfoDb, '_id'> = {
        userID,
        bsea,
        deseAccommodations,
        language,
        relationship,
      }
      const result = await fetch('/api/form/additionalinfo/save', {
        method: 'POST',
        body: JSON.stringify(body),
      })
      const resBody = await result.json()
      if (result.status !== 200) {
        console.error(resBody.error)
      }
    }
    save()
  }, [bsea, deseAccommodations, language, relationship])

  // loads values in from database, only loads once
  useEffect(() => {
    const retrieve = async () => {
      if (!data?.user?.id) {
        return
      }
      const userID = data.user.id
      const result = await fetch(
        `/api/form/additionalinfo/retrieve?userID=${userID}`
      )
      const body = await result.json()
      if (result.status !== 200) {
        console.error(body.error)
      } else {
        const { bsea, deseAccommodations, language, relationship } =
          body as AdditionalInfoDb
        setBsea(bsea),
          setDeseAccommodations(deseAccommodations),
          setLanguage(language),
          setRelationship(relationship)
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
      onSubmit={(values, actions) => {
        router.push('/form/district')
        actions.setSubmitting(false)
      }}
      onBack={() => router.push('/form/contactinfo')}
      currentPage="Additional Info"
    >
      <TitleText>Additional Info</TitleText>
      <FormContainer>
        <InfoText>What is your primary language?</InfoText>
        <Tooltip
          tooltip={{
            tooltipText: 'What if I speak more than one language?',
            tooltipHoveredText: `Select the language that you have identified as your preferred language for communicating with the school.
If you tell the school you prefer a language other than English, you have the right to receive information from the school in that language.  The tool will include questions about whether the school communicated in the right language during the walkthrough if you identify another language here.`,
          }}
        />
        <TextArea
          width={330}
          height={42}
          name={'language'}
          placeholder={'Type language'}
          value={language}
          onChange={(event) => setLanguage(event.target.value)}
        />
        <InfoText>What is your relationship to the student?</InfoText>
        <Tooltip
          tooltip={{
            tooltipText: 'More information',
            tooltipHoveredText:
              "Anyone can file a PRS complaint, including a parent, social worker, attorney, counselor, or other third party. If you are not the student's parent or guardian, you need to get the parent or education decision maker’s permission to file a complaint related to a specific child.",
          }}
        />
        <StyledSelect
          value={relationship}
          label="Select Relationship"
          onChange={(evt) => setRelationship(evt.target.value as string)}
        >
          {relationships.map((relationship) => {
            return (
              <MenuItem key={relationship} value={relationship}>
                {relationship}
              </MenuItem>
            )
          })}
        </StyledSelect>
        <InfoText>
          If you require accommodations for communicating with DESE, describe
          them in the box below.
        </InfoText>
        <Tooltip
          tooltip={{
            tooltipText:
              'If you require accommodations for communicating with DESE, describe them in the box below.',
            tooltipHoveredText: `Include anything you want DESE to know about communicating with you.  Some examples are: 

    If you want DESE to communicate with you in a language 
    other than English
 
    If you prefer to speak over the phone rather than by email

    If there are certain hours during the day that you are not 
    available to answer the phone`,
          }}
        />
        <TextArea
          width={600}
          height={150}
          name={'deseAccommodation'}
          placeholder={'Describe accomodations here'}
          value={deseAccommodations}
          onChange={(evt) => setDeseAccommodations(evt.target.value)}
        />
        <InfoText>
          Are any of these concerns currently being addressed by Mediation or a
          Hearing in the Bureau of Special Education Appeals (BSEA)?
        </InfoText>
        <Tooltip
          tooltip={{
            tooltipText: 'How does this affect my PRS complaint?',
            tooltipHoveredText: `You can still file the complaint now, but PRS might delay their decision.  

If your concerns are being addressed by a mediation, PRS will ask if you want them to wait to make a decision until the mediation is over.  If you and the school both agree to wait, PRS will make a decision about any concerns that aren't resolved after the mediation.  If you do not agree to wait, PRS will make a decision according to the usual timeline (within 60 days of filing).  Once PRS makes a decision, the decision can't be changed by the mediation.

If your concerns are being addressed by a BSEA hearing, PRS will wait to make a decision on the parts of your complaint that are going to be addressed during the hearing.  Once your case is over with the BSEA, PRS will make a decision on any concerns that weren't addressed during the hearing.  PRS and the BSEA will share information about your case, so that PRS can make a decision when the BSEA case is over.  The information will include your case number in each agency, your name, the student's name, your address, the school and the school district.`,
          }}
        />
        <RadioGroup
          value={bsea ? 'Yes' : 'No'}
          onChange={(evt) => setBsea(evt.target.value === 'Yes')}
        >
          <RadioButton type="radio" value={'Yes'} />
          <RadioButton type="radio" value={'No'} />
        </RadioGroup>
      </FormContainer>
    </FormTemplate>
  )
}
export default AdditionalInfo
