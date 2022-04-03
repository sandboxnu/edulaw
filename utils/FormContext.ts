import React from 'react'

export type FormValues = { [key: string]: FormAnswer }

export interface FormAnswer {
  questionId: number
  question?: string
  answerId: number
  answer?: string
  userAnswer?: string
}

// Interface has two parts
export interface FormContextInterface {
  formValues: FormValues
  updateFormValues?: (formValues: FormValues) => void
}

export const emptyFormValues: FormValues = {}

export const defaultFormState: FormContextInterface = {
  formValues: emptyFormValues,
}

export const FormCtx =
  React.createContext<FormContextInterface>(defaultFormState)
