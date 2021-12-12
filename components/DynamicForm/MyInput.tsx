import { FieldHookConfig, useField } from 'formik'
import React, { ChangeEvent } from 'react'
import { QuestionText } from '../FormStyles/QuestionText'
import { InputBox } from '../FormStyles/InputBox'
import QuestionLayout from '../FormStyles/QuestionLayout'

interface InputProps {
  name: string
  label: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
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
        input={<InputBox type="text" {...field} onChange={props.onChange} />}
      />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  )
}
