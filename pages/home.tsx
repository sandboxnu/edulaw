import NavBar from '../components/Critical/NavBar'
import MainPage from '../components/MainPage'
import SideProgressBar from '../components/Critical/SideProgressBar'
import React from 'react'
import {
  Main,
  SidebarDiv,
  HorizontalBox,
} from '../components/FormStyles/ExtraStyles'
import { useRouter } from 'next/router'

function Home() {
  return (
    <Main>
      <NavBar />
      <HorizontalBox>
        <SidebarDiv>
          <SideProgressBar currentPage="Home" />
        </SidebarDiv>
        <MainPage />
      </HorizontalBox>
    </Main>
  )
}

export default Home
