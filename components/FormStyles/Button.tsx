import styled, { css } from 'styled-components'

interface buttonProps {
  primary?: boolean
}

export const Button = styled.button`
  background: white;
  border-width: 1px;
  border-color: #777777;
  border-style: solid;
  text-align: center;
  font-size: 24px;
  font-family: 'Source Sans Pro';
  display: inline-block;
  border-radius: 6px;
  color: black;
  width: 140px;
  height: 54px;
  margin: 0;

  ${(props: buttonProps) =>
    props.primary &&
    css`
      border: none;
      background: #5064c7;
      color: white;
    `};
`
