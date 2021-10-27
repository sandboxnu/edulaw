import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import NavBar from '../components/NavBar'
import SplitPage from '../components/SplitPage'
import MainPage from '../components/MainPage';
import SideProgressBar from '../components/SideProgressBar';

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
        <SplitPage left={<MainPage />} right={<SideProgressBar />} />
      </main>
    </div>
  )
}

export default Home
