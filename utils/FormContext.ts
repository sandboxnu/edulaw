import React from 'react'

export interface FormValues {
  formAnswers: {
    [key: string]: FormAnswer
  }
}

export interface FormAnswer {
  questionId: string
  answerId: string
  userAnswer?: string
}

// Interface has two parts
interface FormContextInterface {
  formValues: FormValues
  updateFormValues?: (formValues: FormValues) => void
}

export const emptyFormValues: FormValues = {
  formAnswers: {},
}

export const defaultFormState: FormContextInterface = {
  formValues: emptyFormValues,
}

export const FormCtx =
  React.createContext<FormContextInterface>(defaultFormState)
