import React, { useState, useEffect } from 'react'
import { GroupDB } from '../api/form/group/save'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { studentSpecialCircumstances } from '../../constants/additionalConstants'

const Group: React.FC = () => {
  const [checkedArr, setCheckedArr] = useState<Array<boolean>>([
    false,
    false,
    false,
    false,
  ])
  const router = useRouter()
  const { data, status } = useSession()
  const [loaded, setLoaded] = useState<boolean>(false)

  if (status === 'unauthenticated') {
    router.push('/signup')
  }

  useEffect(() => {
    const save = async () => {
      if (!data?.user?.id) {
        return
      }
      const userID = data.user.id
      const body: Omit<GroupDB, '_id'> = {
        userID: userID,
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
    save()
  }, [checkedArr])

  useEffect(() => {
    const retrieve = async () => {
      if (!data?.user?.id) {
        return
      }
      const userID = data.user.id
      const result = await fetch(`/api/form/group/retrieve?userID=${userID}`)
      const body = await result.json()
      if (result.status !== 200) {
        console.error(body.error)
      } else {
        const typedBody = body as GroupDB
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
    console.log(checkedArr)
  }
  return !loaded ? (
    <p>loading...</p>
  ) : (
    <form onSubmit={() => router.push('/form/concern')}>
      <select>
        <option value="Student">Student</option>
        <option value="Group">Group</option>
      </select>

      {studentSpecialCircumstances.map((option, index) => {
        return (
          <label key={index}>
            <input
              type="checkbox"
              value={option}
              checked={checkedArr[index]}
              onChange={() => handleOnChange(index)}
            />
            {option}
          </label>
        )
      })}
    </form>
  )
}

export default Group
