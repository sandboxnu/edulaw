import React, { useEffect } from 'react'
import { QuestionText } from '../FormStyles/QuestionText'

interface ContinueProps {
  label: string
  onMount: () => void
  description?: string
}

const MyContinue: React.FC<ContinueProps> = ({
  label,
  onMount,
  description,
}) => {
  useEffect(() => {
    onMount()
  }, [])

  return (
    <div>
      <br />
      <QuestionText>{label}</QuestionText>
      {description ? <p>{description}</p> : null}
      <br />
      <br />
    </div>
  )
}

export default MyContinue
