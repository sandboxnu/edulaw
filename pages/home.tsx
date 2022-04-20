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
        left={<MainPage />}
        right={<SideProgressBar />}
        leftStyle={{
          width: '70%',
          height: '100%',
          position: 'relative',
          boxShadow: '0px 3px 4px rgba(0, 0, 0, 0.1)',
        }}
        rightStyle={{
          width: '30%',
          position: 'relative',
          backgroundColor: '#F4F5F7',
        }}
      />
    </main>
  )
}

export default home
