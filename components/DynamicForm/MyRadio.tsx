import { FieldHookConfig, useField } from 'formik'
import React, { ChangeEvent } from 'react'
import { Answer } from '../../models'
import { FormAnswer } from '../../utils/FormContext'

interface MyRadioProps {
  name: string
  label: string
  options: Answer[]
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  ans: FormAnswer
}

function isChecked(optionId: number, answers: FormAnswer): boolean {
  if (answers) {
    return optionId.toString() == answers.answerId
  }
  return false
}

export const MyRadio: React.FC<MyRadioProps & FieldHookConfig<string>> = ({
  ...props
}): JSX.Element => {
  const [field, meta] = useField(props)
  const answers = props.options.map(function (option, i) {
    return (
      <label key={option.content}>
        <input
          type="radio"
          {...field}
          value={option.id}
          onChange={props.onChange}
          //checked={isChecked(option.id, props.ans)}
        />
        {option.content}
      </label>
    )
  })

  return (
    <div key={props.name} role="group" aria-labelledby="my-radio-group">
      {props.label}
      <br />
      {answers}

      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  )
}
