import React, { useEffect } from 'react'
import { QuestionText } from '../FormStyles/QuestionText'

interface ContinueProps {
  label: string
  onMount: () => void
  description?: string
}

/*
Represents a "Continue" question in the form, which just displays some information and allows user to keep on moving forward
(no answers to choose)
*/
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
