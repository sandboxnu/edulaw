import { FieldHookConfig, useField } from 'formik'
import React from 'react'

interface InputProps {
  children: string
}

export const MyCheckbox: React.FC<InputProps & FieldHookConfig<string>> = ({
  children,
  ...props
}) => {
  const [field, meta] = useField({ ...props, type: 'checkbox' })
  return (
    <div>
      <label className="checkbox-input">
        <input type="checkbox" {...field} />
        {children}
      </label>

      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  )
}
