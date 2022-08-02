import React from 'react'
import { TailSpin } from 'react-loader-spinner'
import styled from 'styled-components'
import { COLORS } from '../constants/colors'
const SpinnerWrapper = styled.div<any>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`

export const LoadingSpinner: React.FC = () => {
  return (
    <SpinnerWrapper>
      <TailSpin color={COLORS.EDLAW_GREEN} height={100} width={100} />
    </SpinnerWrapper>
  )
}
