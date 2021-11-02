import styles from '../styles/Home.module.css'
import NavBar from '../components/NavBar'
import SplitPage from '../components/SplitPage'
import MainPage from '../components/MainPage';
import SideProgressBar from '../components/SideProgressBar';

function home() {
  return (
    <main className={styles.main}>
      <NavBar></NavBar>
      <SplitPage 
        left={<MainPage />} 
        right={<SideProgressBar />} 
        leftStyle={{ width: '70%', height: '100%', position: 'relative', 
          boxShadow: '0px 3px 4px rgba(0, 0, 0, 0.1)',}}
        rightStyle={{width: "30%", position: "relative", backgroundColor: "#F4F5F7", paddingTop: "50px"}}
      />
    </main>
  )
}

export default home
