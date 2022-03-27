import { Answer } from './answer'
import { questions } from '../constants'

type Questions = Array<Question>
const typedQuestions = questions as Questions

export type QuestionsKeys = keyof Questions
export interface Question {
  id: number
  question: string
  description?: string
  type: string
  answers: Answer[]
  tooltipText?: string
  tooltipHoveredText?: string
}

export { typedQuestions as questions }
