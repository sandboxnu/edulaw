import { FieldHookConfig, useField } from 'formik'
import React, { ChangeEvent } from 'react'
import { FormAnswer, TextFormAnswer } from '../../utils/FormContext'
import { QuestionText } from '../FormStyles/QuestionText'
import QuestionLayout from '../FormStyles/QuestionLayout'
import { StyledTextInput } from '../FormStyles/InputBox'
import Tooltip from './Tooltip'

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
