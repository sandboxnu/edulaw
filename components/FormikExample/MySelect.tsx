import { FieldHookConfig, useField } from 'formik'
import React from 'react'

interface InputProps {
  label: string
  values: string[]
}

export const MySelect: React.FC<InputProps & FieldHookConfig<string>> = (
  props
) => {
  const [field, meta] = useField(props)
  return (
    <div>
      <label htmlFor={props.id || props.name}>{props.label}</label>
      <select {...field}>
        <option value="default">Select an option</option>
        {props.values.map((op) => {
          return (
            <option key={op} value={op}>
              {op}
            </option>
          )
        })}
      </select>

      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  )
}
