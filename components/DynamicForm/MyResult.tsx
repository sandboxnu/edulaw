import { ChangeEvent, useContext } from 'react'
import {
  FormAnswer,
  FormCtx,
  FormContextInterface,
  FormValues,
} from '../../utils/FormContext'
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
      questionId: idBasedFormAnswer.questionId,
      question:
        questions[idBasedFormAnswer.questionId as QuestionsKeys].question,
      answerId: idBasedFormAnswer.answerId,
      answer: answers[idBasedFormAnswer.answerId as AnswersKeys]
        .content as string,
      userAnswer: idBasedFormAnswer.userAnswer ?? undefined,
    }
    return contentBasedFormAnswer
  })

  return results
}

// updates the form values for the given question in the given context with the contents of the given event
function _updateTextInputs(
  ctx: FormContextInterface,
  questionId: string,
  event: ChangeEvent<HTMLInputElement>
) {
  const formValues: FormValues = ctx.formValues
  const userInput: string = event.target.value
  formValues.formAnswers[questionId].userAnswer = userInput
  if (ctx.updateFormValues) {
    ctx.updateFormValues(formValues)
  }
}

export const MyResult: React.FC<MyResultProps> = ({
  ...props
}): JSX.Element => {
  const ctx = useContext(FormCtx)
  const formAnswers = ctx.formValues.formAnswers
  const results = buildResults(formAnswers).map((key) => {
    function _onChange(event: ChangeEvent<HTMLInputElement>) {
      _updateTextInputs(ctx, key.questionId, event)
    }

    return (
      <div key={key.questionId}>
        <p>{key.question}</p>
        <p>{key.answer}</p>
        {key.userAnswer ? (
          <input
            className="text-input"
            defaultValue={key.userAnswer}
            onChange={_onChange}
          />
        ) : null}
        <br />
      </div>
    )
  })

  return (
    <div>
      {results}
      <br />
      <p>{props.label}</p>
      {props.description ? <p>{props.description}</p> : null}
    </div>
  )
}
