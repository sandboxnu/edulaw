import React, { useContext } from 'react'
import { FormCtx } from './FormContext'

const ExampleResults: React.FC = () => {
  const { formValues } = useContext(FormCtx)

  return <div>{`Name: ${formValues.firstName} ${formValues.lastName}`}</div>
}

export default ExampleResults
