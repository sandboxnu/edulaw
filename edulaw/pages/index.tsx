import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import NavBar from '../components/NavBar'
import Typography from '@material-ui/core/Typography';
import FullPage from '../components/FullPage'

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

        <Typography variant='h1'>Hello</Typography>
        <FullPage />
      </main>
    </div>
  )
}

export default Home
