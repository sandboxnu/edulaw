import React, { useState, useEffect } from 'react'
import { GroupDB } from '../api/form/group/save'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { studentSpecialCircumstances } from '../../constants/additionalConstants'
import { FormTemplate } from '../../components/Critical/FormTemplate'
import { StyledAutocomplete, StyledTextField } from './additionalinfo'
import { Checkbox, MenuItem, TextField } from '@material-ui/core'
import { InfoText } from '../../components/FormStyles/QuestionText'
import { TextArea } from '../../components/FormStyles/TextArea'
import { InputCol } from './contactinfo'
import isSignedIn from '../../utils/isSignedIn'

const Group: React.FC = () => {
  const [studentOrGroup, setStudentOrGroup] = useState<string | undefined>()
  const [checkedArr, setCheckedArr] = useState<Array<boolean>>([
    false,
    false,
    false,
    false,
  ])
  const router = useRouter()
  const { data, status } = useSession()
  const [loaded, setLoaded] = useState<boolean>(false)

  if (!isSignedIn({ data, status })) {
    router.push('/signup')
  }

  const save = async () => {
    if (!data?.user?.id) {
      return
    }
    const body: Omit<GroupDB, '_id'> = {
      studentOrGroup: studentOrGroup,
      specialCircumstances: checkedArr,
    }
    const result = await fetch('/api/form/group/save', {
      method: 'POST',
      body: JSON.stringify(body),
    })
    const resBody = await result.json()
    if (result.status !== 200) {
      console.error(resBody.error)
    }
  }

  useEffect(() => {
    const retrieve = async () => {
      if (!data?.user?.id || loaded) {
        return
      }
      const result = await fetch(`/api/form/group/retrieve`)
      const body = await result.json()
      if (result.status !== 200) {
        console.error(body.error)
      } else {
        const typedBody = body as GroupDB
        setStudentOrGroup(typedBody.studentOrGroup)
        setCheckedArr(typedBody.specialCircumstances)
      }
      setLoaded(true)
    }
    if (!loaded) {
      retrieve()
    }
  }, [data])

  const handleOnChange = (position: number) => {
    const updatedCheckedArr = [
      ...checkedArr.slice(0, position),
      !checkedArr[position],
      ...checkedArr.slice(position + 1),
    ]
    setCheckedArr(updatedCheckedArr)
  }

  return (
    <FormTemplate
      title="Student and Group Details"
      onNavigate={save}
      loaded={loaded}
      onSubmit={async (values, actions) => {
        await save()
        router.push('/form/concern')
        actions.setSubmitting(false)
      }}
      onBack={async () => {
        await save()
        router.push('/form/district')
      }}
      currentPage="Student or Group Details"
    >
      <InputCol>
        <InfoText>
          Are you filing this complaint on behalf of one student or a group of
          students?
        </InfoText>
        <StyledAutocomplete
          value={studentOrGroup}
          onChange={(event, newValue) => {
            setStudentOrGroup(newValue as string)
          }}
          options={['One Student', 'Group of Students']}
          sx={{ width: 330, height: 42 }}
          renderInput={(params) => <StyledTextField {...params} />}
        />
      </InputCol>
      <InputCol>
        <InfoText>Do any of the following apply to the student?</InfoText>
        <div>
          {studentSpecialCircumstances.map((option, index) => {
            return (
              <div key={option}>
                <Checkbox
                  checked={checkedArr[index]}
                  onChange={() => handleOnChange(index)}
                />
                <label>{option}</label>
              </div>
            )
          })}
        </div>
      </InputCol>
    </FormTemplate>
  )
}

export default Group
