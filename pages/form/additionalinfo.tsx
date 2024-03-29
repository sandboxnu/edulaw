//import { CheckBoxOutlineBlankOutlined } from '@mui/icons-material'
import { MenuItem, Select, TextField, TextFieldProps } from '@material-ui/core'
import Autocomplete from '@mui/material/Autocomplete'
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
import isSignedIn from '../../utils/isSignedIn'
import { AdditionalInfoDb } from '../api/form/additionalinfo/save'
import { FormContainer, InputCol, InputRow } from './contactinfo'

export const StyledAutocomplete = styled(Autocomplete)`
  & {
    border-color: ${COLORS.SHADOW_GREY};
    background-color: ${COLORS.LIGHT_GREY};
    color: ${COLORS.TEXT_GREY};
  }
`

export const StyledTextField = styled(TextField)`
  & div,
  > input {
    border: 1px solid ${COLORS.SHADOW_GREY} !important;
    background-color: ${COLORS.LIGHT_GREY};
    box-sizing: border-box;
    padding: 0px !important;
    border-radius: 6px !important;
    font-size: 16px !important;
    line-height: 26px !important;
    font-family: 'Source Sans Pro' !important;
    resize: none;
    &:focus {
      border: 1px solid ${COLORS.EDLAW_BLUE};
      outline: none;
    }
  }

  & input {
    padding: 10px !important;
  }

  & > div {
    padding-bottom: 0 !important;
    padding-right: 0 !important;
  }

  & > div > div {
    display: none !important;
  }

  & > ::after {
    display: none !important;
  }

  & > ::before {
    display: none !important;
  }
`

const relationships = [
  'Student',
  'Parent or Legal Guardian',
  'Special Education Surrogate',
  'School Employee',
]

const AdditionalInfo: React.FC = () => {
  const [language, setLanguage] = useState<string>('')
  const [relationship, setRelationship] = useState<string | undefined>(
    undefined
  )
  const [deseAccommodations, setDeseAccommodations] = useState<string>('')
  const [bsea, setBsea] = useState<'Yes' | 'No' | undefined>()
  const router = useRouter()
  const { data, status } = useSession()
  const [loaded, setLoaded] = useState<boolean>(false)

  // reroutes to signup if not logged in

  if (!isSignedIn({ data, status })) {
    router.push('/signup')
  }

  // saves values to database
  const save = async () => {
    if (!data?.user?.id) {
      return
    }
    const body: Omit<AdditionalInfoDb, '_id'> = {
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

  // loads values in from database, only loads once
  useEffect(() => {
    const retrieve = async () => {
      if (!data?.user?.id || loaded) {
        return
      }
      const result = await fetch(`/api/form/additionalinfo/retrieve`)
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
      title="Additional Info"
      onNavigate={save}
      loaded={loaded}
      onSubmit={async (values, actions) => {
        await save()
        router.push('/form/district')
        actions.setSubmitting(false)
      }}
      onBack={async () => {
        await save()
        router.push('/form/contactinfo')
      }}
      currentPage="Additional Info"
    >
      <InputRow>
        <InputCol style={{ marginTop: '0px', marginBottom: '0px' }}>
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
        </InputCol>
        <InputCol style={{ marginTop: '0px', marginBottom: '0px' }}>
          <InfoText>What is your relationship to the student?</InfoText>
          <Tooltip
            tooltip={{
              tooltipText: 'More information',
              tooltipHoveredText:
                "Anyone can file a PRS complaint, including a parent, social worker, attorney, counselor, or other third party. If you are not the student's parent or guardian, you need to get the parent or education decision maker’s permission to file a complaint related to a specific child.",
            }}
          />
          <StyledAutocomplete
            freeSolo
            inputValue={relationship}
            options={relationships}
            onInputChange={(evt, newValue) => setRelationship(newValue)}
            sx={{ width: 330, height: 42 }}
            renderInput={(params) => <StyledTextField {...params} />}
          />
        </InputCol>
      </InputRow>
      <InputCol>
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
          height={100}
          name={'deseAccommodation'}
          placeholder={'Describe accomodations here'}
          value={deseAccommodations}
          onChange={(evt) => setDeseAccommodations(evt.target.value)}
          resize={true}
        />
      </InputCol>
      <InputCol>
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
        <StyledAutocomplete
          value={bsea}
          options={['Yes', 'No']}
          onChange={(evt, newValue) =>
            setBsea(newValue as 'Yes' | 'No' | undefined)
          }
          sx={{ width: 330, height: 42 }}
          renderInput={(params) => <StyledTextField {...params} />}
        />
      </InputCol>
    </FormTemplate>
  )
}
export default AdditionalInfo
