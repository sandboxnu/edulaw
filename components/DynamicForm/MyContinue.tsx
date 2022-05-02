import React, { useEffect } from 'react'
import QuestionLayout from '../FormStyles/QuestionLayout'

interface ContinueProps {
  label: string
  onMount: () => void
}

/*
Represents a "Continue" question in the form, which just displays some information and allows user to keep on moving forward
(no answers to choose)
*/
const MyContinue: React.FC<ContinueProps> = ({ label, onMount }) => {
  useEffect(() => {
    console.log('mounted')
    console.log(label)
    onMount()
  }, [])

  return <QuestionLayout questionText={label} input={<div />} />
}

export default MyContinue
