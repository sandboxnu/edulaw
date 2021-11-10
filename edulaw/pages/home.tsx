import styles from '../styles/Home.module.css'
import NavBar from '../Components/NavBar'
import SplitPage from '../Components/SplitPage'
import MainPage from '../Components/MainPage'
import SideProgressBar from '../Components/SideProgressBar'
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
          paddingTop: '50px',
        }}
      />
    </main>
  )
}

export default home
