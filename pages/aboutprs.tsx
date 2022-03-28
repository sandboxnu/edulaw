import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import AboutPrs from '../components/LandingPage/LandingAboutPrs'
import LandingSplitPage from '../components/LandingPage/LandingSplitPage'
import React from 'react'

const AboutPrsPg: NextPage = () => {
  return (
    <div className={styles.container}>
      <LandingSplitPage center={<AboutPrs />} />
    </div>
  )
}

export default AboutPrsPg
