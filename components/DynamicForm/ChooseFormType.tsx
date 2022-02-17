import React, { ChangeEvent } from 'react'
import { MyTextInput } from './MyInput'
import { Question, Answer, AnswersKeys, answers } from '../../models'
import { MyRadio } from './MyRadio'
import { MyResult } from './MyResult'
import { FormAnswer } from '../../utils/FormContext'

interface ChooseFormTypeProps {
  question: Question
  onChange: (event: ChangeEvent<HTMLInputElement>, isUserInput: boolean) => void
  answers: FormAnswer
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
          ans={props.answers}
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
          ans={props.answers}
        />
      )
    }
    case 'RESULT': {
      return (
        <MyResult
          label={props.question.question}
          description={props.question.description}
        />
      )
    }
    // TODO: Other form types in general
    default: {
      return <div />
    }
  }
}
