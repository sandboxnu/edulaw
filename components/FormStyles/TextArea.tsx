import styled from 'styled-components'
import { COLORS } from '../../constants/colors'
import { CUTOFFS } from '../../constants/responsive'

interface TextAreaProps {
  width: number
  height: number
  cutoffWidth?: number
}

export const TextArea = styled.textarea`
  width: ${(props: TextAreaProps) => props.width}px;
  height: ${(props: TextAreaProps) => props.height}px;
  border: 1px solid ${COLORS.SHADOW_GREY};
  background-color: ${COLORS.LIGHT_GREY};
  box-sizing: border-box;
  padding: 10px;
  border-radius: 6px;
  font-size: 16px;
  line-height: 26px;
  font-family: 'Source Sans Pro';
  resize: none;
  &:focus {
    border: 1px solid ${COLORS.EDLAW_BLUE};
    outline: none;
  }
  @media (max-width: ${CUTOFFS.mobile}px) {
    width: ${(props: TextAreaProps) => props.cutoffWidth}px;
  }
`
