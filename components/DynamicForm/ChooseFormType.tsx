import React, { ChangeEvent } from 'react'
import { MyTextInput } from './MyInput'
import { Question, Answer, AnswersKeys, answers } from '../../models'
import { MyRadio } from './MyRadio'
import { MyResult } from './MyResult'

interface ChooseFormTypeProps {
  question: Question
  onChange: (event: ChangeEvent<HTMLInputElement>, isUserInput: boolean) => void
}

export const ChooseFormType: React.FC<ChooseFormTypeProps> = ({
  ...props
}): JSX.Element => {
  const answerChoices: Answer[] = props.question.answers.map(function (
    answerId: number,
    _: number
  ) {
    const typedAnswerId = answerId.toString() as AnswersKeys
    return answers[typedAnswerId] as Answer
  })

  switch (props.question.type) {
    case 'RADIO': {
      return (
        <MyRadio
          name={props.question.id.toString()}
          label={props.question.question}
          options={answerChoices}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            props.onChange(event, false)
          }
        />
      )
    }
    case 'TEXT': {
      return (
        <MyTextInput
          name={props.question.id.toString()}
          label={props.question.question}
          onChange={(event: ChangeEvent<HTMLInputElement>) =>
            props.onChange(event, true)
          }
        />
      )
    }
    case 'RESULT': {
      return <MyResult />
    }
    // TODO: Other form types in general
    default: {
      return <div />
    }
  }
}
