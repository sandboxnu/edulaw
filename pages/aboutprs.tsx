import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import NavBar from '../components/NavBar'
import SplitPage from '../components/SplitPage'
import AboutPrs from '../components/LandingAboutPrs'
import RightsPrsMenu from '../components/RightsPrsMenu'
import StartComplaint from '../components/StartComplaint'
import React from 'react'

// reaaaaaaallly repetitive - clean up needed for index, studentrights, and aboutprs

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
          center={<AboutPrs />}
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
