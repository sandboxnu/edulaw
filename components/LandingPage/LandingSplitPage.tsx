import React from 'react'
import styles from '../../styles/Home.module.css'
import NavBar from '../Critical/NavBar'
import RightsPrsMenu from '../LandingPage/RightsPrsMenu'
import BottomBar from './BottomButtonBar'
import { COLORS } from '../../constants/colors'
import { SidebarDiv, HorizontalBox } from '../FormStyles/ExtraStyles'
import styled from 'styled-components'
import { CUTOFFS } from '../../constants/responsive'

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

const SidebarLandingDiv = styled(SidebarDiv)`
  background-color: ${COLORS.LIGHT_GREY};
`

interface LandingProps {
  center: JSX.Element
}

// component that creates a single point for the styling of the landing-related pages to reduce redundancy
function LandingSplitPage(props: LandingProps) {
  return (
    <main className={styles.main}>
      <NavBar />
      <SplitPageResponsive>
        <HorizontalBox>
          <SidebarLandingDiv>
            <RightsPrsMenu />
          </SidebarLandingDiv>
          {props.center}
        </HorizontalBox>
      </SplitPageResponsive>
      <BottomBar />
    </main>
  )
}

export default LandingSplitPage
