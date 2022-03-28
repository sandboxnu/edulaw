import React, { useState } from 'react'
import { InputBox, ErrorDiv } from '../FormStyles/InputBox'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import styled from 'styled-components'
import { FieldHookConfig, useField } from 'formik'

export const IconButton = styled.button`
  border: none;
  background: none;
  color: #5064c7;
  margin-left: -50px;
  margin-right: 25px;
`

interface PasswordProps {
  width: string
  height: string
  placeholder: string
}

export const PasswordInputBox: React.FC<
  PasswordProps & FieldHookConfig<string>
> = (props) => {
  const [visibility, setVisibility] = useState(false)
  const [field, meta] = useField(props)

  const toggleVisiblity = () => {
    setVisibility(!visibility)
  }

  return (
    <div key={props.name}>
      <div style={{ display: 'flex' }}>
        <InputBox
          width={props.width}
          height={props.height}
          placeholder={props.placeholder}
          {...field}
          type={visibility ? 'text' : 'password'}
        />
        <IconButton onClick={toggleVisiblity} type="button">
          {visibility ? <VisibilityIcon /> : <VisibilityOffIcon />}
        </IconButton>
      </div>
      {meta.touched && meta.error ? (
        <ErrorDiv className="error">{meta.error}</ErrorDiv>
      ) : null}
    </div>
  )
}
