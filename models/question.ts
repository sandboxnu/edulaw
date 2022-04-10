import { Answer } from './answer'

export interface Question {
  id: number
  question: string
  description?: string
  type: string
  answers: Answer[]
  tooltip?: { tooltipText: string; tooltipHoveredText: string }
  section: string
}
