import { FieldHookConfig, useField } from 'formik'
import React from 'react'

interface InputProps {
  label: string
}

export const MyTextInput: React.FC<InputProps & FieldHookConfig<string>> = ({
  label,
  ...props
}) => {
  const [field, meta] = useField(props)

  return (
    <>
      <label htmlFor={`${props.id}-${props.name}`}>{label}</label>
      <input className="text-input" {...field} />

      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  )
}
