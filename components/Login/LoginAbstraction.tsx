import React from 'react'
import NavBar from '../Critical/NavBar'
import { COLORS } from '../../constants/colors'
import styled from 'styled-components'

const LoginPageDiv = styled.div`
  width: 100%;
  height: calc(100vh - 80px);
  display: flex;
  justify-content: center;
  padding-top: 50px;
  background-color: ${COLORS.LIGHT_GREY};
`

interface LoginProps {
  main: JSX.Element
}

// component that creates a single point for the styling of the login-related pages to reduce redundancy
function LoginAbstraction(props: LoginProps) {
  return (
    <div>
      <NavBar />
      <LoginPageDiv>{props.main}</LoginPageDiv>
    </div>
  )
}

export default LoginAbstraction
