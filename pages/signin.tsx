import SignIn from '../components/Login/SignIn'
import LoginContainer from '../components/Login/LoginContainer'
import React from 'react'
import LoginAbstraction from '../components/Login/LoginAbstraction'

function signin() {
  return (
    <LoginAbstraction
      main={
        <LoginContainer
          headerPhrase="Welcome Back!"
          bottomPhrase="Don't have an account?"
          buttonPhrase="Sign Up"
          buttonLink="/signup"
          form={<SignIn />}
        />
      }
    />
  )
}

export default signin
