import { FieldHookConfig, useField } from 'formik'
import React, { ChangeEvent } from 'react'
import { answers } from '../../constants'
import { FormAnswer } from '../../utils/FormContext'

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
  console.log(props.ans)
  console.log(props.ans.userAnswer)
  if (props.ans) {
    console.log(props.ans.userAnswer)
    console.log("doesn't seem undefined")
    return (
      <div key={props.name}>
        <label htmlFor={`${props.id}-${props.name}`}>{props.label}</label>
        <input
          className="text-input"
          {...field}
          onChange={props.onChange}
          defaultValue={props.ans.userAnswer}
        />

        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </div>
    )
  } else {
    console.log('def undefined')
    return (
      <div key={props.name}>
        <label htmlFor={`${props.id}-${props.name}`}>{props.label}</label>
        <input
          className="text-input"
          {...field}
          onChange={props.onChange}
          defaultValue="check"
        />

        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </div>
    )
  }
}
