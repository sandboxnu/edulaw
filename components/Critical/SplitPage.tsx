import React, { FC } from 'react'
import styled from 'styled-components'
import { CUTOFFS } from '../../constants/responsive'

// this component has become very much NOT critical due to restyling oops

const SplitPageResponsive = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  alignitems: stretch;
  @media (max-width: ${CUTOFFS.mobile}px) {
    flex-direction: column;
    justify-content: start;
  }
`

interface SplitPageProps {
  left: JSX.Element
  right: JSX.Element
  center?: JSX.Element
  leftStyle?: React.CSSProperties
  rightStyle?: React.CSSProperties
  centerStyle?: React.CSSProperties
}

const SplitPage: FC<SplitPageProps> = ({
  left,
  right,
  center = <div></div>,
  leftStyle = { width: '70%', height: '100%', position: 'relative' },
  centerStyle = { width: '0%', height: '100%', position: 'relative' },
  rightStyle = { width: '30%', height: '100%', position: 'relative' },
}): JSX.Element => {
  return (
    <SplitPageResponsive>
      <div style={leftStyle}>{left}</div>
      <div style={centerStyle}>{center}</div>
      <div style={rightStyle}>{right}</div>
    </SplitPageResponsive>
  )
}

export default SplitPage
