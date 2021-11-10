import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import NavBar from '../Components/NavBar'
import SplitPage from '../Components/SplitPage'
import LandingStudentRights from '../Components/LandingStudentRightsGuide'
import RightsPrsMenu from '../Components/RightsPrsMenu'
import StartComplaint from '../Components/StartComplaint'
import React from 'react'

const StudentRights: NextPage = () => {
  return (
    <div className={styles.container}>
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
          center={<LandingStudentRights />}
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

export default StudentRights
