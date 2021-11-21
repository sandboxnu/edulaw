import styled, { css } from 'styled-components'

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
