import React from 'react'
import { QuestionType } from '../models/question'

export type FormValues = { [key: string]: FormAnswer }

export type FormAnswer =
  | RadioFormAnswer
  | ContinueQuestionAnswer
  | TextFormAnswer

interface QuestionAnswer {
  questionId: number
}

export interface ContinueQuestionAnswer extends QuestionAnswer {
  type: QuestionType.CONTINUE
}

export interface RadioFormAnswer extends QuestionAnswer {
  type: QuestionType.RADIO
  answerId: number
}
export interface TextFormAnswer extends QuestionAnswer {
  type: QuestionType.TEXT
  userAnswer: string
}

export interface FormResult {
  question: string
  answer?: string
  formAnswer: FormAnswer
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
