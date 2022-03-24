import ForgotPassword from '../components/Login/ForgotPassword'
import SideBox from '../components/Login/SideBox'
import LoginSplitPage from '../components/Login/LoginSplitPage'
import React from 'react'

function forgotpassword() {
  return (
    <LoginSplitPage
      left={<ForgotPassword />}
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

export default forgotpassword
