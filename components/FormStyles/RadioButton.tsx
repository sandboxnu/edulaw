import styled from 'styled-components'
import { COLORS } from '../../constants/colors'

export const RadioButton = styled.input`
  opacity: 0;
  position: fixed;
  width: 120px;
  height: 42px;
  border-radius: 0;

  + label {
    background-color: ${COLORS.LIGHT_GREY};
    border-color: ${COLORS.SHADOW_GREY};
    color: ${COLORS.TEXT_GREY};
    border-style: solid;
    font-size: 14px;
    font-family: 'Source Sans Pro';
    display: flex;
    border-radius: 6px;
    width: 120px;
    height: 42px;
    justify-content: center;
    align-items: center;
  }

  &:checked + label {
    border: none;
    background: #5064c7;
    color: white;
  }
`
