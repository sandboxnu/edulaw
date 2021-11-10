import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
// import NavBar from '../Components/NavBar'
import SplitPage from '../Components/SplitPage'
import AboutPrs from '../Components/LandingAboutPrs'
import RightsPrsMenu from '../Components/RightsPrsMenu'
import StartComplaint from '../Components/StartComplaint'
import React from 'react'

// reaaaaaaallly repetitive - clean up needed for index, studentrights, and aboutprs

const StudentRights: NextPage = () => {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        {/*<NavBar></NavBar>*/}
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
