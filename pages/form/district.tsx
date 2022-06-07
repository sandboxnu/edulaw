import React, { useState } from 'react'
import { districts, schools } from '../../constants'

const District: React.FC = () => {
  const [district, setDistrict] = useState<number | undefined>(undefined)
  const [school, setSchool] = useState<number | undefined>(undefined)

  return (
    <div>
      <select
        name="District"
        value={district}
        onChange={(event) => {
          setDistrict(parseInt(event.target.value))
          setSchool(undefined)
        }}
      >
        {districts.map((district, index) => {
          return (
            <option key={district} value={index}>
              {district}
            </option>
          )
        })}
      </select>
      <select
        name="School"
        value={school}
        onChange={(event) => setSchool(parseInt(event.target.value))}
      >
        {district !== undefined &&
          schools[district].map((school, index) => {
            return (
              <option key={school} value={index}>
                {school}
              </option>
            )
          })}
      </select>
    </div>
  )
}

export default District
