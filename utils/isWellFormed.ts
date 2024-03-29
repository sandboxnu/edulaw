import { Question } from '../models'
import { QuestionType } from '../models/question'

type WellFormedResponse = {
  message: string | undefined
  pass: boolean
}

const isWellFormed = (questions: Question[]) => {
  const response = questions.reduce(
    (soFar, question, idx) => {
      if (!soFar.pass) return soFar
      if (question.question === '')
        return {
          message: `Questions checked: ${idx}/${questions.length}\nQuestion ${question.id} has no content`,
          pass: false,
        }
      if (question.question.split('"').length > 3) {
        return {
          message: `Questions checked: ${idx}/${questions.length}\nQuestion ${question.id} has too many double quotes:\n${question.question}`,
          pass: false,
        }
      }
      const outOfBounds = question.answers.find(
        (answer) => answer.route < 0 || answer.route >= questions.length
      )
      if (outOfBounds) {
        return {
          message: `Questions checked: ${idx}/${questions.length}\nQuestion ${
            question.id
          } has an answer that points out of bounds.\nSection: ${
            question.section
          }\nQuestion: ${question.question}\nAnswer: ${JSON.stringify(
            outOfBounds
          )}`,
          pass: false,
        }
      }

      const answersWellFormed = (q: Question) => {
        switch (q.type) {
          case QuestionType.RADIO:
            return (
              q.answers.length > 0 &&
              q.answers.every((answer) => answer.content)
            )
          case QuestionType.TEXT:
            return q.answers.length === 1 && q.answers[0].content === undefined
          case QuestionType.CONTINUE:
            return q.answers.length === 1 && q.answers[0].content === undefined
          case QuestionType.RESULT:
            return q.answers.length === 0
        }
      }

      if (answersWellFormed(question)) {
        return soFar
      } else {
        return {
          message: `Questions checked: ${idx}/${questions.length}\nQuestion ${
            question.id
          } has malformed answers for type ${question.type}.\nSection: ${
            question.section
          }\nQuestion: ${question.question}\nAnswers: ${JSON.stringify(
            question.answers
          )}`,
          pass: false,
        }
      }
    },
    { message: undefined, pass: true } as WellFormedResponse
  )
  return {
    message: () => response.message ?? `Expected questions to be well-formed`,
    pass: response.pass,
  }
}

export default isWellFormed
