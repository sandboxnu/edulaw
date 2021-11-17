import { questions } from '../constants'

type Questions = typeof questions
const typedQuestions = questions as Questions

export type QuestionsKeys = keyof Questions
export interface Question {
  id: number
  question: string
  description: string
  type: string
  answers: number[]
}

export { typedQuestions as questions }
