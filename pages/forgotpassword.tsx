import ForgotPassword from '../components/Login/ForgotPassword'
import LoginContainer from '../components/Login/LoginContainer'
import LoginSplitPage from '../components/Login/LoginSplitPage'
import React from 'react'

function forgotpassword() {
  return (
    <LoginSplitPage
      left={<ForgotPassword />}
      right={
        <LoginContainer
          headerPhrase="Don't have an account?"
          bottomPhrase="Don't worry; it's easy to get started!"
          buttonPhrase="Create an account"
          buttonLink="/signup"
          form={<div></div>}
        />
      }
    />
  )
}

export default forgotpassword
