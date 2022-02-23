import styles from '../styles/Home.module.css'
import NavBar from '../components/Critical/NavBar'
import SplitPage from '../components/Critical/SplitPage'
import ForgotPassword from '../components/Login/ForgotPassword'
import SideBox from '../components/Login/SideBox'
import React from 'react'

function forgotpassword() {
  return (
    <main className={styles.main}>
      <NavBar />
      <SplitPage
        left={<ForgotPassword />}
        right={
          <SideBox
            headerPhrase="Don't have an account?"
            description="Don't worry; it's easy to get started!"
            buttonPhrase="Create an account"
            buttonLink="/signup"
          />
        }
        leftStyle={{
          width: '67%',
          height: '100%',
          minHeight: '100vh',
          position: 'relative',
          boxShadow: '0px 3px 4px rgba(0, 0, 0, 0.1)',
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '4%',
        }}
        rightStyle={{
          width: '33%',
          position: 'relative',
          backgroundColor: '#F4F5F7',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          paddingTop: '50px',
        }}
      />
    </main>
  )
}

export default forgotpassword
