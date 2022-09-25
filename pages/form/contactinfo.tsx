import styled from 'styled-components'
import {
  InfoText,
  QuestionText,
  TitleText,
} from '../../components/FormStyles/QuestionText'
import { StyledTextInput } from '../../components/FormStyles/InputBox'
import { FormTemplate } from '../../components/Critical/FormTemplate'
import { useRouter } from 'next/router'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { ContactInfoDb } from '../api/form/contactinfo/save'
import { useSession } from 'next-auth/react'
import { ConcernDB } from '../api/form/concern/save'
import { TextArea } from '../../components/FormStyles/TextArea'

const InputRow = styled.div`
  display: flex;
  row-gap: 12px;
  column-gap: 20px;
  max-width: 800px;
  flex-flow: row wrap;
  margin: 10px 0;
`
export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  overflow-y: auto;
`

function ContactInfo() {
  const [loaded, setLoaded] = useState(false)
  const router = useRouter()
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [phoneNum, setPhoneNum] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [address, setAddress] = useState<string>('')
  const [city, setCity] = useState<string>('')
  const [state, setState] = useState<string>('')
  const [zip, setZip] = useState<string>('')
  const { data, status } = useSession()

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
      userID,
      firstName,
      lastName,
      phoneNum,
      email,
      address,
      city,
      state,
      zip,
    }
    const result = await fetch('/api/form/contactinfo/save', {
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
      const result = await fetch(
        `/api/form/contactinfo/retrieve?userID=${userID}`
      )
      const body = await result.json()
      if (result.status !== 200) {
        console.error(body.error)
      } else {
        const {
          firstName,
          lastName,
          phoneNum,
          email,
          address,
          city,
          state,
          zip,
        } = body as ContactInfoDb
        setFirstName(firstName)
        setLastName(lastName)
        setEmail(email)
        setPhoneNum(phoneNum)
        setAddress(address)
        setCity(city)
        setState(state)
        setZip(zip)
      }
      setLoaded(true)
    }
    if (!loaded) {
      retrieve()
    }
  }, [data])

  const allInputFields: [
    string,
    string,
    string,
    Dispatch<SetStateAction<string>>
  ][][] = [
    [
      ['First Name', 'firstName', firstName, setFirstName],
      ['Last Name', 'lastName', lastName, setLastName],
    ],
    [
      ['Phone', 'phone', phoneNum, setPhoneNum],
      ['Email', 'email', email, setEmail],
    ],
    [
      ['Address', 'address', address, setAddress],
      ['City', 'city', city, setCity],
      ['State', 'state', state, setState],
      ['Zipcode', 'zip', zip, setZip],
    ],
  ]

  router.beforePopState(() => {
    save()
    return true
  })

  return (
    <FormTemplate
      loaded={loaded}
      onSubmit={async (values, actions) => {
        await save()
        router.push('/form/additionalinfo')
        actions.setSubmitting(false)
      }}
      onBack={() => router.push('/home')}
      currentPage="Contact Info"
    >
      <TitleText>Contact Info</TitleText>
      <InfoText>
        The PRS officer will only contact you using the information you provide
        below.
      </InfoText>
      <FormContainer>
        <InputRow>
          <TextArea
            width={330}
            height={42}
            placeholder="First Name"
            value={firstName}
            onChange={(evt) => setFirstName(evt.target.value)}
          />
          <TextArea
            width={330}
            height={42}
            placeholder="Last Name"
            value={lastName}
            onChange={(evt) => setLastName(evt.target.value)}
          />
        </InputRow>
        <InputRow>
          <TextArea
            width={330}
            height={42}
            placeholder="Email"
            value={email}
            onChange={(evt) => setEmail(evt.target.value)}
          />
          <TextArea
            width={330}
            height={42}
            placeholder="Phone Number"
            value={phoneNum}
            onChange={(evt) => setPhoneNum(evt.target.value)}
          />
        </InputRow>
        <InputRow>
          <TextArea
            width={330}
            height={42}
            placeholder="Street Address"
            value={address}
            onChange={(evt) => setAddress(evt.target.value)}
          />
          <TextArea
            width={330}
            height={42}
            placeholder="City"
            value={city}
            onChange={(evt) => setCity(evt.target.value)}
          />
          <TextArea
            width={330}
            height={42}
            placeholder="State"
            value={state}
            onChange={(evt) => setState(evt.target.value)}
          />
          <TextArea
            width={330}
            height={42}
            placeholder="Zip Code"
            value={zip}
            onChange={(evt) => setZip(evt.target.value)}
          />
        </InputRow>
      </FormContainer>
    </FormTemplate>
  )
}
export default ContactInfo
