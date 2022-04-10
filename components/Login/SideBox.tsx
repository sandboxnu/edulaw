import React from 'react'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'
import Link from 'next/link'
import HatImage from './HatImage'

// if you have a better name for this pls name it

export const Container = styled.div`
  width: 340px;
  height: 329px;
  background-color: #ffffff;
  display: flex;
  justify-content: space-evenly;
  flex-flow: column;
  align-items: center;
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
  font-size: 28px;
  line-height: 35px;
  margin-bottom: 4%;
`

export const SideBoxButton = styled.button`
  width: 80%;
  height: 16%;
  background-color: #ffffff;
  border: 1px solid #777777;
  box-sizing: border-box;
  border-radius: 6px;
`

interface LoginSignupProps {
  headerPhrase: string
  description: string
  buttonPhrase: string
  buttonLink: string
}

// functional component for the 'side box' on login/signup pages
function SideBox(props: LoginSignupProps) {
  return (
    <Container>
      <HatImage />
      <TextDiv>
        <HeaderStyle>{props.headerPhrase}</HeaderStyle>
        <Typography variant="body2">{props.description}</Typography>
      </TextDiv>
      <Link href={props.buttonLink} passHref>
        <SideBoxButton>
          <Typography variant="button" style={{ textTransform: 'none' }}>
            {props.buttonPhrase}
          </Typography>
        </SideBoxButton>
      </Link>
    </Container>
  )
}

export default SideBox
