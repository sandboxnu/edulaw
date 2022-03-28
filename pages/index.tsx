import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import LandingContent from '../components/LandingPage/LandingContent'
import LandingSplitPage from '../components/LandingPage/LandingSplitPage'
import React from 'react'

const Landing: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>EduLaw</title>
        <meta name="Problem Resolution System" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <LandingSplitPage center={<LandingContent />} />
    </div>
  )
}

export default Landing
