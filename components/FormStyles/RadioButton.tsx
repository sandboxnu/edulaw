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

export const RadioInputIcon = styled.span`
  border-radius: 50%;
  width: 20px;
  height: 20px;
  box-shadow: inset 0 0 0 1px rgba(16, 22, 26, 0.2),
    inset 0 -1px 0 rgba(16, 22, 26, 0.1);
  background-color: #f5f8fa;
  background-image: linear-gradient(
    rgba(255, 255, 255, 0.05),
    rgba(255, 255, 255, 0)
  );
  margin-right: 8px;
`

export const RadioInputCheckedIcon = styled(RadioInputIcon)`
  background-color: ${COLORS.EDLAW_BLUE};
  linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));
  &:before {
    display: block;
    width: 20px;
    height: 20px;
    background-image: radial-gradient(
      rgb(255, 255, 255),
      rgb(255, 255, 255) 28%,
      transparent 32%
    );
    content: '';
  }
`
