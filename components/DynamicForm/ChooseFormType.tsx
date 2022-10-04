import React, { ChangeEvent } from 'react'
import { MyTextInput } from './MyInput'
import { Question, Answer } from '../../models'
import { MyRadio } from './MyRadio'
import { MyResult } from './MyResult'
import { FormAnswer } from '../../utils/FormContext'
import MyContinue from './MyContinue'
import { QuestionType } from '../../models/question'

interface ChooseFormTypeProps {
  onChange: React.Dispatch<React.SetStateAction<FormAnswer>>
  answer?: FormAnswer
  questionHistory: Question[]
}

export const ChooseFormType: React.FC<ChooseFormTypeProps> = (
  props
): JSX.Element => {
  const { answer } = props
  const question = props.questionHistory[props.questionHistory.length - 1]
  const answerChoices: Answer[] = question.answers
  switch (question.type) {
    case QuestionType.RADIO: {
      return (
        <MyRadio
          name={question.id.toString()}
          label={question.question}
          options={answerChoices}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            props.onChange({
              questionId: parseInt(event.target.name),
              type: QuestionType.RADIO,
              answerId: parseInt(event.target.value),
            })
          }
          ans={answer?.type === QuestionType.RADIO ? answer : undefined}
          tooltip={question.tooltip}
        />
      )
    }
    case QuestionType.TEXT: {
      return (
        <MyTextInput
          name={question.id.toString()}
          label={question.question}
          onChange={(
            event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
          ) =>
            props.onChange({
              questionId: parseInt(event.target.name),
              type: QuestionType.TEXT,
              userAnswer: event.target.value,
            })
          }
          ans={answer?.type === QuestionType.TEXT ? answer : undefined}
          tooltip={question.tooltip}
        />
      )
    }
    case QuestionType.RESULT: {
      return <MyResult label={question.question} {...props} />
    }
    case QuestionType.CONTINUE: {
      return (
        <MyContinue
          label={question.question}
          onMount={() =>
            props.onChange({
              questionId: question.id,
              type: QuestionType.CONTINUE,
            })
          }
        />
      )
    }
    // TODO: Other form types in general
    default: {
      return <div />
    }
  }
}
