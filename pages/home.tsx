import styles from '../styles/Home.module.css'
import NavBar from '../components/Critical/NavBar'
import SplitPage from '../components/Critical/SplitPage'
import MainPage from '../components/MainPage'
import SideProgressBar from '../components/Critical/SideProgressBar'
import React from 'react'

function home() {
  return (
    <main className={styles.main}>
      <NavBar />
      <SplitPage
        right={<MainPage />}
        left={<SideProgressBar />}
        rightStyle={{
          width: '75%',
          height: '100%',
          minHeight: '100vh',
          position: 'relative',
        }}
        leftStyle={{
          width: '25%',
          minHeight: '100vh',
          position: 'relative',
          backgroundColor: '#F4F5F7',
        }}
      />
    </main>
  )
}

export default home
