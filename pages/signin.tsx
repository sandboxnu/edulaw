import SignIn from '../components/Login/SignIn'
import LoginContainer from '../components/Login/LoginContainer'
import React from 'react'
import LoginSplitPage from '../components/Login/LoginSplitPage'

function signin() {
  return (
    <LoginSplitPage
      left={<SignIn />}
      right={
        <LoginContainer
          headerPhrase="Don't have an account?"
          bottomPhrase="Don't worry; it's easy to get started!"
          buttonPhrase="Create an account"
          buttonLink="/signup"
          form={<></>}
        />
      }
    />
  )
}

export default signin
