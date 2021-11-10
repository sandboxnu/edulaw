import React from 'react'

export interface FormValues {
  email: string
  firstName: string
  lastName: string
  acceptedTerms: boolean
  jobType: string
}

// Interface has two parts
interface FormContextInterface {
  formValues: FormValues
  updateFormValues?: (f: FormValues) => void
}

export const emptyFormValues: FormValues = {
  acceptedTerms: false,
  email: '',
  firstName: '',
  jobType: '',
  lastName: '',
}

export const defaultFormState: FormContextInterface = {
  formValues: emptyFormValues,
}

export const FormCtx =
  React.createContext<FormContextInterface>(defaultFormState)
