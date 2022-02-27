import styled from 'styled-components'
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

export const ErrorDiv = styled.div`
  color: #ff0000;
`

interface InputProps {
  name: string
  width: string
  height: string
  defaultValue?: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  type?: string
  placeholder?: string
}

export const StyledTextInput: React.FC<InputProps & FieldHookConfig<string>> =
  ({ ...props }) => {
    const [field, meta] = useField(props)

    // try and make this less jank
    function onChangeInput(): JSX.Element {
      if (props.onChange) {
        return (
          <InputBox
            width={`${props.width}`}
            height={`${props.height}`}
            defaultValue={props.defaultValue}
            {...field}
            onChange={props.onChange}
            type={props.type}
            placeholder={props.placeholder}
          />
        )
      }
      return (
        <InputBox
          width={`${props.width}`}
          height={`${props.height}`}
          defaultValue={props.defaultValue}
          {...field}
          type={props.type}
          placeholder={props.placeholder}
        />
      )
    }

    return (
      <div key={props.name}>
        {onChangeInput()}
        {meta.touched && meta.error ? (
          <ErrorDiv className="error">{meta.error}</ErrorDiv>
        ) : null}
      </div>
    )
  }
