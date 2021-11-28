import styled, { css } from 'styled-components'
import { FieldHookConfig, useField } from 'formik'
import React, { ChangeEvent } from 'react'

interface InputBoxProps {
  width: string
  height: string
}

export const InputBox = styled.input`
  width: ${(props: InputBoxProps) => props.width};
  height: ${(props: InputBoxProps) => props.height};
  border: 0.75px solid #595959;
  box-sizing: border-box;
  padding: 10px;
  border-radius: 6px;
  font-size: 21px;
  line-height: 26px;
`

interface InputProps {
  name: string
  width: string
  height: string
  placeholder: string
}

export const MyTextInput: React.FC<InputProps & FieldHookConfig<string>> = ({
  ...props
}) => {
  const [field, meta] = useField(props)

  return (
    <div key={props.name}>
      {/* <label htmlFor={`${props.id}-${props.name}`}>{props.label}</label> */}
      <InputBox
        width={`${props.width}`}
        height={`${props.height}`}
        placeholder={`${props.placeholder}`}
        type="text"
        {...field}
      />

      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </div>
  )
}
