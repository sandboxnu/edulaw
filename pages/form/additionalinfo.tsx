import { CheckBoxOutlineBlankOutlined } from '@mui/icons-material'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { FormTemplate } from '../../components/Critical/FormTemplate'
import { AdditionalInfoDb } from '../api/form/additionalInfo/save'

// TODO: Get accurate stuff for this
const languages = ['English', 'Spanish']
const relationships = ['Parent', 'Legal Guardian', 'Other']

const District: React.FC = () => {
  const [language, setLanguage] = useState<number | undefined>(undefined)
  const [relationship, setRelationship] = useState<number | undefined>(
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
      const result = await fetch('/api/form/additional/save', {
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
        `/api/form/additional/retrieve?userID=${userID}`
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
      initialValues={{
        language: undefined,
        relationship: undefined,
        deseAccomodations: '',
        bsea: false,
      }}
      onSubmit={(values, actions) => {
        router.push('/form/district')
        actions.setSubmitting(false)
      }}
      onBack={() => router.push('/form/contactinfo')}
      currentPage="Additional Info"
    >
      <select
        name="Language"
        value={language}
        onChange={({ target }) => {
          setLanguage(parseInt(target.value))
        }}
      >
        {languages.map((language, index) => {
          return (
            <option key={language} value={index}>
              {language}
            </option>
          )
        })}
      </select>
      <select
        name="Relationship"
        value={relationship}
        onChange={({ target }) => setRelationship(parseInt(target.value))}
      >
        {relationships.map((relationship, index) => {
          return (
            <option key={relationship} value={index}>
              {relationship}
            </option>
          )
        })}
      </select>
      <input
        name="deseAccommodation"
        value={deseAccommodations}
        onChange={({ target }) => setDeseAccommodations(target.value)}
      />
      <label>
        BSEA???
        <input
          name="bsea"
          type="checkbox"
          checked={bsea}
          onChange={({ target }) => setBsea(target.checked)}
        />
      </label>
    </FormTemplate>
  )
}
export default District
