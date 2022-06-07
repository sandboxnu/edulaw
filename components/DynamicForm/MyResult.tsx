import React, { ChangeEvent, useContext } from 'react'
import {
  FormAnswer,
  FormContextInterface,
  FormCtx,
  FormResult,
  FormValues,
} from '../../utils/FormContext'
import { Question } from '../../models'
import { QuestionsWithBlockText, AnswerText } from '../FormStyles/QuestionText'
import styled from 'styled-components'
import { StyledTextInput } from '../FormStyles/InputBox'
import { QuestionType } from '../../models/question'
import QuestionLayout from '../FormStyles/QuestionLayout'
import { FieldHookConfig, useField } from 'formik'

const SingleQuestionResponseDiv = styled.div`
  display: flex;
  flex-direction: column;
`
interface MyResultProps {
  label: string
  questionHistory: Question[]
}

// translates ID-based results to content-based results
export function buildResults(
  formValues: FormValues,
  questionHistory: Question[]
): FormResult[] {
  // const questionKeys = Object.keys(formAnswers)
  const results = questionHistory.reduce(
    (results: FormResult[], curQuestion) => {
      const curFormAns = formValues.formAnswers[curQuestion.id]
      // filter out everything but type TEXT
      if (
        curFormAns === undefined ||
        curFormAns.type === QuestionType.CONTINUE ||
        curFormAns.type === QuestionType.RADIO
      )
        return results

      const contentBasedFormAnswer: FormResult = {
        answer: undefined,
        question: _filterQuotes(curQuestion.question),
        formAnswer: curFormAns,
      }
      results.push(contentBasedFormAnswer)
      return results
    },
    []
  )
  return results
}

// returns anything between the "" of a string
function _filterQuotes(question: string): string {
  const first = question.indexOf('"')
  const start = first + 1
  const second = question.substring(start).indexOf('"')
  return question.substring(start, start + second)
}

// updates the form values for the given question in the given context with the contents of the given event
function _updateTextInputs(
  ctx: FormContextInterface,
  questionId: number,
  updatedUserInput: string
) {
  const formValues: FormValues = ctx.formValues
  if (
    ctx.setFormValues &&
    formValues.formAnswers[questionId].type === QuestionType.TEXT
  ) {
    ctx.setFormValues({
      formAnswers: {
        ...formValues.formAnswers,
        [questionId]: {
          questionId: questionId,
          type: QuestionType.TEXT,
          userAnswer: updatedUserInput,
        },
      },
    })
  }
}

export const MyResult: React.FC<MyResultProps> = (props): JSX.Element => {
  const ctx = useContext(FormCtx)
  const results = buildResults(ctx.formValues, props.questionHistory).map(
    ({ formAnswer, question, answer }) => {
      function _onChange(event: ChangeEvent<HTMLInputElement>) {
        _updateTextInputs(ctx, formAnswer.questionId, event.target.value)
      }

      return (
        <div key={formAnswer.questionId}>
          <SingleQuestionResponseDiv>
            <QuestionsWithBlockText questionText={question} />
            <AnswerText>{answer}</AnswerText>
          </SingleQuestionResponseDiv>

          {formAnswer.type == QuestionType.TEXT ? (
            <StyledTextInput
              name={formAnswer.userAnswer}
              className="text-input"
              defaultValue={formAnswer.userAnswer}
              onChange={_onChange}
              width={300}
              height={42}
            />
          ) : null}
        </div>
      )
    }
  )

  return (
    <QuestionLayout
      results={results}
      questionText={results.length === 0 ? 'No violations identified' : ''}
      input={<div />}
    />
  )
}
