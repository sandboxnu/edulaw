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
  onChange: (questionId: string, answerId: string, userAnswer?: string) => void
  answers: FormAnswer
  questions: Question[]
}

export const ChooseFormType: React.FC<ChooseFormTypeProps> = ({
  ...props
}): JSX.Element => {
  const answerChoices: Answer[] = props.question.answers

  console.log(props.question.type)
  console.log(QuestionType.RADIO)
  switch (props.question.type) {
    case QuestionType.RADIO: {
      return (
        <MyRadio
          name={props.question.id.toString()}
          label={props.question.question}
          options={answerChoices}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            props.onChange(event.target.name, event.target.value)
          }
          ans={props.answers}
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
            props.onChange(event.target.name, '0', event.target.value)
          }
          ans={props.answers}
          tooltip={props.question.tooltip}
        />
      )
    }
    case QuestionType.RESULT: {
      return (
        <MyResult
          label={props.question.question}
          description={props.question.description}
          {...props}
        />
      )
    }
    case QuestionType.CONTINUE: {
      return (
        <MyContinue
          label={props.question.question}
          description={props.question.description}
          onMount={() => props.onChange(props.question.id.toString(), '0')}
        />
      )
    }
    // TODO: Other form types in general
    default: {
      return <div />
    }
  }
}
