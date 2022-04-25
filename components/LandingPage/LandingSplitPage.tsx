import React from 'react'
import styles from '../../styles/Home.module.css'
import NavBar from '../Critical/NavBar'
import SplitPage from '../Critical/SplitPage'
import RightsPrsMenu from '../LandingPage/RightsPrsMenu'
import StartComplaint from '../LandingPage/StartComplaint'

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
          width: '25%',
          minHeight: '100vh',
          position: 'relative',
          backgroundColor: '#F4F5F7',
        }}
        right={props.center}
        rightStyle={{
          width: '75%',
          height: '100%',
          position: 'relative',
        }}
      />
    </main>
  )
}

export default LandingSplitPage
