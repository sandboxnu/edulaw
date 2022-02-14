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

// function isChecked(optionId: number, answers: FormAnswer): boolean {
//   if (answers) {
//     return optionId.toString() == answers.answerId
//   }
//   return false
// }

export const MyRadio: React.FC<MyRadioProps & FieldHookConfig<string>> = ({
  ...props
}): JSX.Element => {
  const [field, meta] = useField(props)

  // renders input type radio, determines whether or not it should be checked initially
  function initialRadio(optionId: number): JSX.Element {
    if (props.ans) {
      if (optionId.toString() === props.ans.answerId) {
        return (
          <input
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
      <input
        type="radio"
        {...field}
        value={optionId}
        onChange={props.onChange}
      />
    )
  }

  const answers = props.options.map(function (option, i) {
    return (
      <label key={option.content}>
        {/* <input
          type="radio"
          {...field}
          value={option.id}
          onChange={props.onChange}
          //checked={isChecked(option.id, props.ans) ? true : undefined}
        /> */}
        {initialRadio(option.id)}
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
