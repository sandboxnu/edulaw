import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import NavBar from '../Components/NavBar'
import Typography from '@material-ui/core/Typography';
import FullPage from '../Components/FullPage'
import RightsPrsMenu from '../Components/RightsPrsMenu';
import StartComplaint from '../Components/StartComplaint'
import SplitPage from '../Components/SplitPage'
import MainPage from '../Components/MainPage';
import SideProgressBar from '../Components/SideProgressBar';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>EduLaw</title>
        <meta name="Problem Resolution System" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <NavBar></NavBar>

        {/* <Typography variant='h1'>Hello</Typography> */}
        <FullPage />
        <RightsPrsMenu />
        <SplitPage left={<MainPage />} right={<SideProgressBar />} />
      </main>
    </div>
  )
}

export default Home
