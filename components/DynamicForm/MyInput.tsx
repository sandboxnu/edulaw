import { FieldHookConfig, useField } from 'formik'
import React, { ChangeEvent } from 'react'
import { QuestionText } from '../FormStyles/QuestionText'
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

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
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
          <MyTextInput
            type="text"
            label={props.name}
            {...field}
            onChange={props.onChange}
          />
        }
      />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  )
}
