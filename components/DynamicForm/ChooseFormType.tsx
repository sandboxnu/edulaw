import React, { ChangeEvent } from 'react'
import { MyTextInput } from './MyInput'
import { Question, Answer, AnswersKeys, answers } from '../../models'
import { MyRadio } from './MyRadio'
import { MyResult } from './MyResult'
import { FormAnswer } from '../../utils/FormContext'
import MyContinue from './MyContinue'
import { QuestionType } from '../../models/question'

interface ChooseFormTypeProps {
  question: Question
  onChange: (formAnswer: FormAnswer) => void
  answer?: FormAnswer
  questions: Question[]
}

export const ChooseFormType: React.FC<ChooseFormTypeProps> = (
  props
): JSX.Element => {
  const { answer } = props
  const answerChoices: Answer[] = props.question.answers
  switch (props.question.type) {
    case QuestionType.RADIO: {
      return (
        <MyRadio
          name={props.question.id.toString()}
          label={props.question.question}
          options={answerChoices}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            props.onChange({
              questionId: parseInt(event.target.name),
              type: QuestionType.RADIO,
              answerId: parseInt(event.target.value),
            })
          }
          ans={answer?.type === QuestionType.RADIO ? answer : undefined}
          tooltip={props.question.tooltip}
        />
      )
    }
    case QuestionType.TEXT: {
      return (
        <MyTextInput
          name={props.question.id.toString()}
          label={props.question.question}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            props.onChange({
              questionId: parseInt(event.target.name),
              type: QuestionType.TEXT,
              userAnswer: event.target.value,
            })
          }
          ans={answer?.type === QuestionType.TEXT ? answer : undefined}
          tooltip={props.question.tooltip}
        />
      )
    }
    case QuestionType.RESULT: {
      return <MyResult label={props.question.question} {...props} />
    }
    case QuestionType.CONTINUE: {
      return (
        <MyContinue
          label={props.question.question}
          onMount={() =>
            props.onChange({
              questionId: props.question.id,
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
