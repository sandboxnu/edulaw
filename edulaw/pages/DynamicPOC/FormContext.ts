import React from 'react';

export interface FormValues {
  formAnswers: {
    [key: string]: FormAnswer;
   }
}
export interface SelectedAnswer {
  questionId: string;
  answerId: string;
}

interface UserAnswer {
  questionId: string;
  answerId: string;
  userAnswer: string
}

export interface FormAnswer {
  answer: SelectedAnswer | UserAnswer;
}

// Interface has two parts
interface FormContextInterface {
  formValues: FormValues;
  updateFormValues?: (answer: FormAnswer, formValues: FormValues) => void;
}

export const emptyFormValues: FormValues = {
  formAnswers: {}
}

export const defaultFormState: FormContextInterface = {
  formValues: emptyFormValues
}

export const FormCtx = React.createContext<FormContextInterface>(defaultFormState)
