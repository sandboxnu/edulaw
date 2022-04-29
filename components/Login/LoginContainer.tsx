import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import HatImage from './HatImage'
import Divider from '@mui/material/Divider'
import { BackButton } from './LoginStyling'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { CUTOFFS } from '../../constants/responsive'

export const Container = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
`

export const SignInUpContainer = styled.div`
  width: 394px;
  height: 600px;
  background-color: #ffffff;
  display: flex;
  justify-content: space-evenly;
  flex-flow: column;
  align-items: center;
  box-shadow: 0px 0px 15px rgba(160, 160, 160, 0.1);
  border-radius: 4px;
  @media (max-width: ${CUTOFFS.mobile}px) {
    width: 300px;
  }
`

export const TextDiv = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
`

export const HeaderStyle = styled.h2`
  font-family: Source Sans Pro;
  font-style: normal;
  font-weight: 600;
  font-size: 26px;
  line-height: 31px;
  margin-bottom: 4%;
`

export const SideBoxButton = styled.button`
  width: 356px;
  height: 42px;
  background-color: #ffffff;
  border: 1px solid #777777;
  box-sizing: border-box;
  border-radius: 6px;
  @media (max-width: ${CUTOFFS.mobile}px) {
    width: 271px;
  }
  :hover {
    box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24),
      0 17px 50px 0 rgba(0, 0, 0, 0.19);
    cursor: pointer;
  }
`

export const AboveButtonText = styled.p`
  font-family: Source Sans Pro;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  margin-bottom: 4%;
  margin-top: 7%;
`
export const ButtonText = styled.p`
  font-family: Source Sans Pro;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  text-align: center;
`

interface LoginSignupProps {
  headerPhrase: string
  bottomPhrase: string
  buttonPhrase: string
  buttonLink: string
  form: JSX.Element
}

// functional component for the 'side box' on login/signup pages
function LoginContainer(props: LoginSignupProps) {
  return (
    <Container>
      <BackButton>
        <ArrowBackIcon /> Back to home
      </BackButton>
      <SignInUpContainer>
        <TextDiv>
          <HatImage />
          <HeaderStyle>{props.headerPhrase}</HeaderStyle>
        </TextDiv>
        {props.form}
        <TextDiv>
          <Divider sx={{ width: '98%' }} />
          <AboveButtonText>{props.bottomPhrase}</AboveButtonText>
          <Link href={props.buttonLink} passHref>
            <SideBoxButton>
              <ButtonText>{props.buttonPhrase}</ButtonText>
            </SideBoxButton>
          </Link>
        </TextDiv>
      </SignInUpContainer>
    </Container>
  )
}

export default LoginContainer
