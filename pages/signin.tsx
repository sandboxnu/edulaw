import styles from '../styles/Home.module.css'
import NavBar from '../components/Critical/NavBar'
import SplitPage from '../components/Critical/SplitPage'
import SignIn from '../components/Login/SignIn'
import SideBox from '../components/Login/SideBox'
import React from 'react'

function signin() {
  return (
    <main className={styles.main}>
      <NavBar />
      <SplitPage
        left={<SignIn />}
        right={
          <SideBox
            headerPhrase="Don't have an account?"
            description="Don't worry; it's easy to get started!"
            buttonPhrase="Create an account"
            buttonLink="/signup"
          />
        }
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

export default signin
