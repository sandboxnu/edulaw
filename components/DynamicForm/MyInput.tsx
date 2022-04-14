import { FieldHookConfig, useField } from 'formik'
import React, { ChangeEvent } from 'react'
import { FormAnswer } from '../../utils/FormContext'
import { QuestionText } from '../FormStyles/QuestionText'
import QuestionLayout from '../FormStyles/QuestionLayout'
import { StyledTextInput } from '../FormStyles/InputBox'
import Tooltip from './Tooltip'

interface InputProps {
  name: string
  label: string
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  ans: FormAnswer
  tooltip?: { tooltipText: string; tooltipHoveredText: string }
}

export const MyTextInput: React.FC<InputProps & FieldHookConfig<string>> = ({
  ...props
}) => {
  const [field, meta] = useField(props)
  return (
    <div key={props.name}>
      <QuestionLayout
        questionText={<QuestionText>{props.label}</QuestionText>}
        tooltip={<Tooltip tooltip={props.tooltip} />}
        input={
          <StyledTextInput
            type="text"
            {...field}
            onChange={props.onChange}
            defaultValue={props.ans?.userAnswer ? props.ans.userAnswer : ''}
            width="300px"
            height="42px"
          />
        }
      />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  )
}
