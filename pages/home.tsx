import NavBar from '../components/Critical/NavBar'
import MainPage from '../components/MainPage'
import SideProgressBar from '../components/Critical/SideProgressBar'
import React from 'react'
import {
  Main,
  SidebarDiv,
  HorizontalBox,
} from '../components/FormStyles/ExtraStyles'

function home() {
  return (
    <Main>
      <NavBar />
      <HorizontalBox>
        <SidebarDiv>
          <SideProgressBar />
        </SidebarDiv>
        <MainPage />
      </HorizontalBox>
    </Main>
  )
}

export default home
