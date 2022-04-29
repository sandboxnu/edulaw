import SignUp from '../components/Login/SignUp'
import LoginContainer from '../components/Login/LoginContainer'
import React from 'react'
import styled from 'styled-components'
import { COLORS } from '../constants/colors'
import NavBar from '../components/Critical/NavBar'

const LoginPageDiv = styled.div`
  width: 100%;
  height: calc(100vh - 80px);
  display: flex;
  justify-content: center;
  padding-top: 50px;
  background-color: ${COLORS.LIGHT_GREY};
`

function signup() {
  return (
    <div>
      <NavBar />
      <LoginPageDiv>
        <LoginContainer
          headerPhrase="Create your account"
          bottomPhrase="Let's get you logged in"
          buttonPhrase="Log In"
          buttonLink="/signin"
          form={<SignUp />}
        />
      </LoginPageDiv>
    </div>
  )
}

export default signup
