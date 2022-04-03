import { Answer } from './answer'

export enum QuestionType {
  'RESULT',
  'CONTINUE',
  'RADIO',
  'TEXT',
}

export interface Question {
  id: number
  question: string
  description?: string
  type: QuestionType
  answers: Answer[]
  tooltip?: { tooltipText: string; tooltipHoveredText: string }
  section: string
}
