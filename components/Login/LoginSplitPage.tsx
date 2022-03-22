import React from 'react'
import SplitPage from '../Critical/SplitPage'
import styles from '../../styles/Home.module.css'
import NavBar from '../Critical/NavBar'

interface LoginProps {
  left: JSX.Element
  right: JSX.Element
}

function LoginSplitPage(props: LoginProps) {
  return (
    <main className={styles.main}>
      <NavBar />
      <SplitPage
        left={props.left}
        right={props.right}
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

export default LoginSplitPage
