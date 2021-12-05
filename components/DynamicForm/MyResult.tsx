import { ChangeEvent, useContext } from 'react'
import { FormAnswer, FormCtx } from '../../utils/FormContext'
import { questions, QuestionsKeys, answers, AnswersKeys } from '../../models'

interface MyResultProps {
  label: string
  description?: string
}

// translates ID-based results to content-based results
export function buildResults(formAnswers: {
  [key: string]: FormAnswer
}): FormAnswer[] {
  const questionKeys = Object.keys(formAnswers)
  const results = questionKeys.map((key) => {
    const idBasedFormAnswer: FormAnswer = formAnswers[key]
    const contentBasedFormAnswer: FormAnswer = {
      questionId:
        questions[idBasedFormAnswer.questionId as QuestionsKeys].question,
      answerId: answers[idBasedFormAnswer.answerId as AnswersKeys]
        .content as string,
      userAnswer: idBasedFormAnswer.userAnswer ?? undefined,
    }
    return contentBasedFormAnswer
  })

  return results
}

// TODO: Will probably pass in the update function as well, so that on text input, they can edit
export const MyResult: React.FC<MyResultProps> = ({
  ...props
}): JSX.Element => {
  const ctx = useContext(FormCtx)
  const formAnswers = ctx.formValues.formAnswers
  const results = buildResults(formAnswers).map((key, id) => {
    return (
      <div key={id}>
        <p>{key.questionId}</p>
        <p>{key.answerId}</p>
        {key.userAnswer ? <p>{key.userAnswer}</p> : null}
        <br />
      </div>
    )
  })

  return (
    <div>
      {results}
      <p>{props.label}</p>
      {props.description ? <p>{props.description}</p> : null}
    </div>
  )
}
