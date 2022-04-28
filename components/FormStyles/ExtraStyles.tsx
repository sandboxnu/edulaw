import styled from 'styled-components'
import { COLORS } from '../../constants/colors'
import { CUTOFFS } from '../../constants/responsive'
import { Button } from './Button'

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: stretch;
`

export const SidebarDiv = styled.div`
  min-height: 100vh;
  min-width: 25%;
  @media (max-width: ${CUTOFFS.mobile}px) {
    flex-direction: column;
    justify-content: start;
    min-height: 30%;
  }
`

export const HorizontalBox = styled.div`
  display: flex;
  align-items: stretch;
  width: 100%;
  flex-direction: row;
  height: 100%;
  justify-content: center;
  @media (max-width: ${CUTOFFS.mobile}px) {
    flex-direction: column;
    justify-content: start;
  }
`

export const BottomButtonBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  height: 80px;
  border-top: 1px solid ${COLORS.SHADOW_GREY};
  background-color: ${COLORS.LIGHT_GREY};
`

export const ButtonContainer = styled.div`
  margin-right: 80px;
  @media (max-width: ${CUTOFFS.mobile}px) {
    margin-right: 25px;
  }
`

export const NextEndButton = styled(Button)`
  background: ${COLORS.EDLAW_BLUE};
  color: white;
  border: none;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`

export const BackButton = styled(Button)`
  border: none;
  width: 80px;
  color: ${COLORS.EDLAW_BLUE};
  background-color: transparent;
`
