import { FieldHookConfig, useField } from 'formik'
import React, { ChangeEvent } from 'react'
import { Answer } from '../../models'
import { FormAnswer } from '../../utils/FormContext'
import { RadioButton } from '../../components/FormStyles/RadioButton'
import { QuestionText } from '../FormStyles/QuestionText'
import QuestionLayout from '../FormStyles/QuestionLayout'
import Tooltip from './Tooltip'

interface MyRadioProps {
  name: string
  label: string
  options: Answer[]
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  ans?: FormAnswer
  tooltip?: { tooltipText: string; tooltipHoveredText: string }
}

export const MyRadio: React.FC<MyRadioProps & FieldHookConfig<string>> = ({
  ...props
}): JSX.Element => {
  const [field, meta] = useField(props)
  // renders input type radio, determines whether or not it should be checked initially
  function initialRadio(optionId: number): JSX.Element {
    if (props.ans) {
      if (optionId.toString() === props.ans.answerId) {
        return (
          <RadioButton
            type="radio"
            {...field}
            value={optionId}
            onChange={props.onChange}
            defaultChecked
          />
        )
      }
    }
    return (
      <RadioButton
        type="radio"
        {...field}
        value={optionId}
        onChange={props.onChange}
      />
    )
  }

  const answers = props.options.map(function (option, i) {
    return (
      <div key={option.content}>
        {initialRadio(i)}
        <label>{option.content}</label>
      </div>
    )
  })

  return (
    <div key={props.name} role="group" aria-labelledby="my-radio-group">
      <QuestionLayout
        questionText={<QuestionText>{props.label}</QuestionText>}
        tooltip={<Tooltip tooltip={props.tooltip} />}
        input={<>{answers}</>}
      />

      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  )
}
