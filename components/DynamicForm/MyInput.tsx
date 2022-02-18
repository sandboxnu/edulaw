import { FieldHookConfig, useField } from 'formik'
import React, { ChangeEvent } from 'react'
import { answers } from '../../constants'
import { FormAnswer } from '../../utils/FormContext'
import { QuestionText } from '../FormStyles/QuestionText'
import QuestionLayout from '../FormStyles/QuestionLayout'
import { StyledTextInput } from '../FormStyles/InputBox'

interface InputProps {
  name: string
  label: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  ans: FormAnswer
}

export const MyTextInput: React.FC<InputProps & FieldHookConfig<string>> = ({
  ...props
}) => {
  const [field, meta] = useField(props)
  return (
    <div key={props.name}>
      <QuestionLayout
        questionText={
          <QuestionText>
            {' '}
            {/*htmlFor={`${props.id}-${props.name}`}*/} {props.label}
          </QuestionText>
        }
        input={
          <StyledTextInput
            type="text"
            {...field}
            onChange={props.onChange}
            defaultValue={props.ans?.userAnswer ? props.ans.userAnswer : ''}
            width="500px"
            height="54px"
          />
        }
      />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  )
}
