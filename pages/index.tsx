import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import NavBar from '../components/Critical/NavBar'
import SplitPage from '../components/Critical/SplitPage'
import LandingContent from '../components/LandingPage/LandingContent'
import RightsPrsMenu from '../components/LandingPage/RightsPrsMenu'
import StartComplaint from '../components/LandingPage/StartComplaint'
import React from 'react'

const Landing: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>EduLaw</title>
        <meta name="Problem Resolution System" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

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
          center={<LandingContent />}
          centerStyle={{
            width: 'calc(75% - 300px)',
            height: '100%',
            position: 'relative',
          }}
          right={<StartComplaint />}
          rightStyle={{
            width: '255px',
            height: '100%',
            position: 'sticky',
            top: '50px',
            marginTop: '50px',
          }}
        />
      </main>
    </div>
  )
}

export default Landing
