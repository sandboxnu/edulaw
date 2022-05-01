import styled from 'styled-components'
import { FieldHookConfig, useField } from 'formik'
import React, { ChangeEvent } from 'react'
import { COLORS } from '../../constants/colors'
import { CUTOFFS } from '../../constants/responsive'

interface InputBoxProps {
  width: number
  height: number
  cutoffWidth?: number
}

export const InputBox = styled.input`
  width: ${(props: InputBoxProps) => props.width}px;
  height: ${(props: InputBoxProps) => props.height}px;
  border: 1px solid ${COLORS.SHADOW_GREY};
  background-color: ${COLORS.LIGHT_GREY};
  box-sizing: border-box;
  padding: 10px;
  border-radius: 6px;
  font-size: 16px;
  line-height: 26px;
  font-family: 'Source Sans Pro';
  &:focus {
    border: 1px solid ${COLORS.EDLAW_BLUE};
    outline: none;
  }
  @media (max-width: ${CUTOFFS.mobile}px) {
    width: ${(props: InputBoxProps) => props.cutoffWidth}px;
  }
`

export const ErrorDiv = styled.div`
  color: #ff0000;
`

interface InputProps {
  name: string
  width: number
  height: number
  defaultValue?: string
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  type?: string
  placeholder?: string
  cutoffWidth?: number
}

export const StyledTextInput: React.FC<InputProps & FieldHookConfig<string>> = (
  props
) => {
  const [field, meta] = useField(props)

  function onChangeInput(): JSX.Element {
    if (props.onChange) {
      return (
        <InputBox
          width={props.width}
          height={props.height}
          defaultValue={props.defaultValue}
          {...field}
          onChange={props.onChange}
          type={props.type}
          placeholder={props.placeholder}
          cutoffWidth={props.cutoffWidth}
        />
      )
    }
    return (
      <InputBox
        width={props.width}
        height={props.height}
        defaultValue={props.defaultValue}
        {...field}
        type={props.type}
        placeholder={props.placeholder}
        cutoffWidth={props.cutoffWidth}
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
