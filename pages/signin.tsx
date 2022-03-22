import SignIn from '../components/Login/SignIn'
import SideBox from '../components/Login/SideBox'
import React from 'react'
import LoginSplitPage from '../components/Login/LoginSplitPage'

function signin() {
  return (
    <LoginSplitPage
      left={<SignIn />}
      right={
        <SideBox
          headerPhrase="Don't have an account?"
          description="Don't worry; it's easy to get started!"
          buttonPhrase="Create an account"
          buttonLink="/signup"
        />
      }
    />
  )
}

export default signin
