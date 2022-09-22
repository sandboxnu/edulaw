import { FieldHookConfig, useField } from 'formik'
import React, { ChangeEvent } from 'react'
import { TextFormAnswer } from '../../utils/FormContext'
import QuestionLayout from '../FormStyles/QuestionLayout'
import { StyledTextInput } from '../FormStyles/InputBox'

interface InputProps {
  name: string
  label: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  ans?: TextFormAnswer
  tooltip?: { tooltipText: string; tooltipHoveredText: string }
}

export const MyTextInput: React.FC<InputProps & FieldHookConfig<string>> = (
  props
) => {
  const [field, meta] = useField(props)
  return (
    <div key={props.name}>
      <QuestionLayout
        questionText={props.label}
        tooltip={props.tooltip}
        input={
          <StyledTextInput
            type="text"
            {...field}
            onChange={props.onChange}
            defaultValue={props.ans?.userAnswer || ''}
            width={600}
            height={52}
          />
        }
      />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  )
}
