import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { FormTemplate } from '../../components/Critical/FormTemplate'
import { districts, schools } from '../../constants'
import { DistrictDB } from '../api/form/district/save'

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
      initialValues={{
        district: district,
        school: school,
      }}
      onSubmit={(values, actions) => {
        router.push('/form/group')
        actions.setSubmitting(false)
      }}
      onBack={() => router.push('/form/additionalinfo')}
      currentPage="District and School"
    >
      <select
        name="District"
        value={district}
        onChange={(event) => {
          setDistrict(event.target.value)
          setSchool(undefined)
        }}
      >
        {districts.map((district) => {
          return (
            <option key={district} value={district}>
              {district}
            </option>
          )
        })}
      </select>
      <select
        name="School"
        value={school}
        onChange={(event) => setSchool(event.target.value)}
      >
        {district !== undefined &&
          schools[districts.indexOf(district)].map((school) => {
            return (
              <option key={school} value={school}>
                {school}
              </option>
            )
          })}
      </select>
    </FormTemplate>
  )
}

export default District