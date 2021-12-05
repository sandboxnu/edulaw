import { useContext } from 'react'
import { FormAnswer, FormCtx } from '../../utils/FormContext'
import { questions, QuestionsKeys, answers, AnswersKeys } from '../../models'

// TODO: Will probably pass in the update function as well, so that on text input, they can edit
// TODO: Show result "question"? (you are an animal lover vs not?)
export const MyResult: React.FC = (): JSX.Element => {
  const ctx = useContext(FormCtx)
  const formAnswers = ctx.formValues.formAnswers
  const questionKeys = Object.keys(formAnswers)
  const results = questionKeys.map((key) => {
    const formAnswer: FormAnswer = formAnswers[key]

    return (
      <div key={formAnswer.questionId}>
        <p>{questions[formAnswer.questionId as QuestionsKeys].question}</p>
        <p>{answers[formAnswer.answerId as AnswersKeys].content}</p>
        {formAnswer.userAnswer ? <p>{formAnswer.userAnswer}</p> : null}
        <br />
      </div>
    )
  })

  return <div>{results}</div>
}
