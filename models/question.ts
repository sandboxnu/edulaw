import { Answer } from './answer'

export enum QuestionType {
  'RESULT' = 'RESULT',
  'CONTINUE' = 'CONTINUE',
  'RADIO' = 'RADIO',
  'TEXT' = 'TEXT',
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
