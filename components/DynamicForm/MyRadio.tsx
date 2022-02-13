import { FieldHookConfig, useField } from 'formik'
import React, { ChangeEvent } from 'react'
import { Answer } from '../../models'
import { RadioButton } from '../../components/FormStyles/RadioButton'
import { QuestionText } from '../FormStyles/QuestionText'
import QuestionLayout from '../FormStyles/QuestionLayout'

interface MyRadioProps {
  name: string
  label: string
  options: Answer[]
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export const MyRadio: React.FC<MyRadioProps & FieldHookConfig<string>> = ({
  ...props
}): JSX.Element => {
  const [field, meta] = useField(props)
  const answers = props.options.map(function (option) {
    return (
      <label key={option.content}>
        <RadioButton
          type="radio"
          {...field}
          value={option.id}
          onChange={props.onChange}
        />
        <label>{option.content}</label>
      </label>
    )
  })

  return (
    <div key={props.name} role="group" aria-labelledby="my-radio-group">
      <QuestionLayout
        questionText={<QuestionText>{props.label}</QuestionText>}
        input={<>{answers}</>}
      />

      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  )
}
