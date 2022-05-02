import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import LandingStudentRights from '../components/LandingPage/LandingStudentRightsGuide'
import LandingSplitPage from '../components/LandingPage/LandingSplitPage'
import React from 'react'

const StudentRights: NextPage = () => {
  return (
    <div className={styles.container}>
      <LandingSplitPage center={<LandingStudentRights />} />
    </div>
  )
}

export default StudentRights
