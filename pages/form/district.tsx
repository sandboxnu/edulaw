import { MenuItem } from '@material-ui/core'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { FormTemplate } from '../../components/Critical/FormTemplate'
import { InfoText } from '../../components/FormStyles/QuestionText'
import { districts, schools } from '../../constants'
import { DistrictDB } from '../api/form/district/save'
import { StyledSelect } from './additionalinfo'

const District: React.FC = () => {
  const [district, setDistrict] = useState<string | undefined>(undefined)
  const [school, setSchool] = useState<string | undefined>(undefined)
  const router = useRouter()
  const { data, status } = useSession()
  const [loaded, setLoaded] = useState<boolean>(false)

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
      const body: Omit<DistrictDB, '_id'> = {
        userID: userID,
        district: district,
        school: school,
      }
      const result = await fetch('/api/form/district/save', {
        method: 'POST',
        body: JSON.stringify(body),
      })
      const resBody = await result.json()
      if (result.status !== 200) {
        console.error(resBody.error)
      }
    }
    save()
  }, [district, school])

  // loads values in from database, only loads once
  useEffect(() => {
    const retrieve = async () => {
      if (!data?.user?.id) {
        return
      }
      const userID = data.user.id
      const result = await fetch(`/api/form/district/retrieve?userID=${userID}`)
      const body = await result.json()
      if (result.status !== 200) {
        console.error(body.error)
      } else {
        const typedBody = body as DistrictDB
        setDistrict(typedBody.district)
        setSchool(typedBody.school)
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
        router.push('/form/group')
        actions.setSubmitting(false)
      }}
      onBack={() => router.push('/form/additionalinfo')}
      currentPage="District and School"
    >
      <InfoText>Please fill in the student&rsquo;s school district:</InfoText>
      <StyledSelect
        label="Select District"
        value={district}
        onChange={(event) => {
          setDistrict(event.target.value as string)
          setSchool(undefined)
        }}
      >
        {districts.map((district) => {
          return (
            <MenuItem key={district} value={district}>
              {district}
            </MenuItem>
          )
        })}
      </StyledSelect>
      <InfoText>Please fill in the school that the student attends:</InfoText>
      <StyledSelect
        label="Select School"
        value={school}
        onChange={(event) => setSchool(event.target.value as string)}
      >
        {district !== undefined &&
          schools[districts.indexOf(district)].map((school) => {
            return (
              <MenuItem key={school} value={school}>
                {school}
              </MenuItem>
            )
          })}
      </StyledSelect>
    </FormTemplate>
  )
}

export default District
