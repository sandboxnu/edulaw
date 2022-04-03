import styled, { css } from 'styled-components'
import { COLORS } from '../../constants/colors'

interface buttonProps {
  primary?: boolean
}

export const Button = styled.button`
  background: ${COLORS.LIGHT_GREY};
  border-width: 1px;
  border-color: ${COLORS.SHADOW_GREY};
  border-style: solid;
  text-align: center;
  font-size: 16px;
  display: inline-block;
  border-radius: 4px;
  color: ${COLORS.TEXT_GREY};
  width: 150px;
  height: 42px;
  margin: 0;
  &:hover {
    background: red;
  }

  ${(props: buttonProps) =>
    props.primary &&
    css`
      border: none;
      background: #5064c7;
      color: white;
    `};
`
