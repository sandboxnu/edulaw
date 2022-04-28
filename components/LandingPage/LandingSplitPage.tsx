import React from 'react'
import styles from '../../styles/Home.module.css'
import NavBar from '../Critical/NavBar'
import SplitPage from '../Critical/SplitPage'
import RightsPrsMenu from '../LandingPage/RightsPrsMenu'
import BottomBar from './BottomButtonBar'
import { COLORS } from '../../constants/colors'

interface LandingProps {
  center: JSX.Element
}

// component that creates a single point for the styling of the landing-related pages to reduce redundancy
function LandingSplitPage(props: LandingProps) {
  return (
    <main className={styles.main}>
      <NavBar />
      <SplitPage
        left={<RightsPrsMenu />}
        leftStyle={{
          minWidth: '25%',
          minHeight: 'calc(100vh - 160px)',
          position: 'relative',
          backgroundColor: COLORS.LIGHT_GREY,
        }}
        right={props.center}
        rightStyle={{
          width: '75%',
          height: '100%',
          position: 'relative',
        }}
      />
      <BottomBar />
    </main>
  )
}

export default LandingSplitPage
