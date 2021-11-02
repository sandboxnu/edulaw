import type { NextPage } from 'next'
import styles from '../styles/Home.module.css'
import NavBar from '../components/NavBar'
import SplitPage from '../components/SplitPage'
import LandingStudentRights from '../components/LandingStudentRightsGuide'
import RightsPrsMenu from '../components/RightsPrsMenu'
import StartComplaint from '../components/StartComplaint'

const StudentRights: NextPage = () => {
  return (
    <div className={styles.container}>

      <main className={styles.main}>
        <NavBar></NavBar>
        <SplitPage 
          left={<RightsPrsMenu />} 
          leftStyle={{width: "25%", minHeight: '100vh', position: "relative", backgroundColor: "#F4F5F7"}} 
          center={<LandingStudentRights />} 
          centerStyle={{width: "calc(75% - 300px)", height: "100%", position: "relative"}}  
          right={<StartComplaint />} 
          rightStyle={{width: "255px", height: "100%", position: "sticky", top: '50px', marginTop: '50px'}} 
        />
      </main>
    </div>
  )
}

export default StudentRights