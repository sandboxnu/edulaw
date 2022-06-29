import React, { useState } from 'react'

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
