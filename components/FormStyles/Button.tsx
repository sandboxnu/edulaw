import styled, { css } from 'styled-components'

interface buttonProps {
  primary?: boolean
  width?: number
}

export const Button = styled.button`
  font-family: 'Source Sans Pro';
  text-align: center;
  font-size: 16px;
  display: inline-block;
  border-radius: 4px;
  width: ${({ width }: buttonProps) => (width ? width : 150)}px;
  height: 42px;
  margin: 0;
  &:hover {
    cursor: pointer;
  }

  ${(props: buttonProps) =>
    props.primary &&
    css`
      border: none;
      background: #5064c7;
      color: white;
    `};
`
