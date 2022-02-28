import { answers } from '../constants'

type Answers = typeof answers
const typedAnswers = answers as Answers

export type AnswersKeys = keyof Answers
export interface Answer {
  content?: string
  route: number
}
export { typedAnswers as answers }
