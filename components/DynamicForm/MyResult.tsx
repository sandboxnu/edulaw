import { ChangeEvent, useContext } from 'react'
import {
  FormAnswer,
  FormContextInterface,
  FormCtx,
  FormValues,
} from '../../utils/FormContext'
import { answers, AnswersKeys, questions, QuestionsKeys } from '../../models'
import { QuestionText } from '../FormStyles/QuestionText'
import { InputBox } from '../FormStyles/InputBox'
import styled from 'styled-components'
import { MyTextInput } from './MyInput'

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

const HorizontalDiv = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 2em;
  flex-direction: row;
`
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
        <HorizontalDiv>
          <QuestionText>{key.question}</QuestionText>
          <QuestionText>{key.answer}</QuestionText>
        </HorizontalDiv>

        {/*<p>{key.question}</p>*/}
        {/*<p>{key.answer}</p>*/}
        {key.userAnswer ? (
          <MyTextInput
            name={key.userAnswer}
            label={key.userAnswer}
            className="text-input"
            defaultValue={key.userAnswer}
            onChange={_onChange}
          />
        ) : null}
      </div>
    )
  })

  return (
    <div>
      {results}
      <br />
      <QuestionText>{props.label}</QuestionText>
      {props.description ? <p>{props.description}</p> : null}
      <br />
      <br />
    </div>
  )
}
