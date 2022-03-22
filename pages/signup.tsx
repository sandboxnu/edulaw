import SignUp from '../components/Login/SignUp'
import SideBox from '../components/Login/SideBox'
import LoginSplitPage from '../components/Login/LoginSplitPage'
import React from 'react'

function signup() {
  return (
    <LoginSplitPage
      left={<SignUp />}
      right={
        <SideBox
          headerPhrase="Already have an account?"
          description="Let's get you logged in"
          buttonPhrase="Log In"
          buttonLink="/signin"
        />
      }
    />
  )
}

export default signup
