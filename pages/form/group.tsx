import React, { useState, useEffect } from 'react'
import { GroupDB } from '../api/form/group/save'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

const checkQuestions = [
  'The student has an IEP (individualized education plan)',
  'The student has a 504 plan',
  'The student is home schooled ',
  'The student is being educated through a Home Hospital Program',
]

const Group: React.FC = () => {
  const [checkedArr, setCheckedArr] = useState<Array<boolean>>([
    false,
    false,
    false,
    false,
  ])
  const router = useRouter()
  const { data, status } = useSession()

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

  const handleOnChange = (position: number) => {
    const updatedCheckedArr = [
      ...checkedArr.slice(0, position),
      !checkedArr[position],
      ...checkedArr.slice(position + 1),
    ]
    setCheckedArr(updatedCheckedArr)
    console.log(checkedArr)
  }
  return (
    <div>
      <select>
        <option value="Student">Student</option>
        <option value="Group">Group</option>
      </select>

      {checkQuestions.map((option, index) => {
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
    </div>
  )
}

export default Group
