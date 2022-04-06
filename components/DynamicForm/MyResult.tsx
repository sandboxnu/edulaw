import { ChangeEvent, useContext } from 'react'
import {
  FormAnswer,
  FormContextInterface,
  FormCtx,
  FormResult,
  FormValues,
} from '../../utils/FormContext'
import { Question } from '../../models'
import { QuestionText } from '../FormStyles/QuestionText'
import styled from 'styled-components'
import { StyledTextInput } from '../FormStyles/InputBox'
import { QuestionType } from '../../models/question'
import QuestionLayout from '../FormStyles/QuestionLayout'

interface MyResultProps {
  label: string
  questions: Question[]
}

// translates ID-based results to content-based results
export function buildResults(
  formAnswers: {
    [key: string]: FormAnswer
  },
  questions: Question[]
): FormResult[] {
  const questionKeys = Object.keys(formAnswers)
  const results = questionKeys
    .filter((key) => {
      const idBasedFormAnswer: FormAnswer = formAnswers[key]
      return (
        questions[idBasedFormAnswer.questionId].type !== QuestionType.CONTINUE
      )
    })
    .map((key) => {
      const idBasedFormAnswer: FormAnswer = formAnswers[key]
      const contentBasedFormAnswer: FormResult = {
        answer:
          idBasedFormAnswer.type == QuestionType.RADIO
            ? questions[idBasedFormAnswer.questionId].answers[
                idBasedFormAnswer.answerId
              ].content
            : undefined,
        question: questions[idBasedFormAnswer.questionId].question,
        formAnswer: idBasedFormAnswer,
      }
      return contentBasedFormAnswer
    })
  return results
}

// updates the form values for the given question in the given context with the contents of the given event
function _updateTextInputs(
  ctx: FormContextInterface,
  questionId: number,
  updatedUserInput: string
) {
  const formValues: FormValues = ctx.formValues
  const currentQuestion = formValues.formAnswers[questionId]
  if (currentQuestion.type === QuestionType.TEXT)
    currentQuestion.userAnswer = updatedUserInput
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
export const MyResult: React.FC<MyResultProps> = (props): JSX.Element => {
  const ctx = useContext(FormCtx)
  const results = buildResults(ctx.formValues.formAnswers, props.questions).map(
    ({ formAnswer, question, answer }) => {
      function _onChange(event: ChangeEvent<HTMLInputElement>) {
        _updateTextInputs(ctx, formAnswer.questionId, event.target.value)
      }

      return (
        <div key={formAnswer.questionId}>
          <HorizontalDiv>
            <QuestionText>{question}</QuestionText>
            <QuestionText>{answer}</QuestionText>
          </HorizontalDiv>

          {formAnswer.type == QuestionType.TEXT ? (
            <StyledTextInput
              name={formAnswer.userAnswer}
              className="text-input"
              defaultValue={formAnswer.userAnswer}
              onChange={_onChange}
              width="500px"
              height="64px"
            />
          ) : null}
        </div>
      )
    }
  )

  return (
    <QuestionLayout
      results={results}
      questionText={props.label}
      input={<div />}
    />
  )
}
