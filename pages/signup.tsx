import SignUp from '../components/Login/SignUp'
import LoginContainer from '../components/Login/LoginContainer'
import React from 'react'
import LoginAbstraction from '../components/Login/LoginAbstraction'

function signup() {
  return (
    <LoginAbstraction
      main={
        <LoginContainer
          headerPhrase="Create your account"
          bottomPhrase="Let's get you logged in"
          buttonPhrase="Log In"
          buttonLink="/signin"
          form={<SignUp />}
        />
      }
    />
  )
}

export default signup
