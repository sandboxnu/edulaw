import NavBar from '../components/Critical/NavBar'
import MainPage from '../components/MainPage'
import SideProgressBar from '../components/Critical/SideProgressBar'
import React from 'react'
import styled from 'styled-components'
import { CUTOFFS } from '../constants/responsive'
import { HorizontalBox } from '../components/FormStyles/ExtraStyles'

const Main = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: stretch;
`

const SideProgressDiv = styled.div`
  min-height: 100vh;
  min-width: 25%;
  @media (max-width: ${CUTOFFS.mobile}px) {
    flex-direction: column;
    justify-content: start;
    min-height: 30%;
  }
`

function home() {
  return (
    <Main>
      <NavBar />
      <HorizontalBox>
        <SideProgressDiv>
          <SideProgressBar />
        </SideProgressDiv>
        <MainPage />
      </HorizontalBox>
      {/* <SplitPage
        right={<MainPage />}
        left={<SideProgressBar />}
        rightStyle={{
          width: '75%',
          height: '100%',
          minHeight: '100vh',
          position: 'relative',
        }}
        leftStyle={{
          width: '25%',
          minHeight: '100vh',
          position: 'relative',
          backgroundColor: '#F4F5F7',
        }}
      /> */}
    </Main>
  )
}

export default home
