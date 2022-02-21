import React from 'react'
import styled from 'styled-components'
import Typography from '@material-ui/core/Typography'
import Link from 'next/link'

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

function SideBox(props: LoginSignupProps) {
  return (
    <Container>
      <svg
        width="93"
        height="69"
        viewBox="0 0 93 69"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.37939 27.8312L15.2592 34.5172V45.6473C15.2592 46.5833 15.7954 47.4367 16.6386 47.843L43.1919 60.6338C43.5218 60.7925 43.8833 60.8749 44.2496 60.8749H48.7116C49.0779 60.8749 49.4392 60.7925 49.7695 60.6338L76.2493 47.8781C76.7626 47.6305 77.173 47.2113 77.4093 46.6929C77.4426 46.6198 77.4744 46.5459 77.5062 46.4718C77.6355 46.1692 77.7021 45.8434 77.7021 45.5145V34.517L81.4882 32.6933V47.786C80.669 48.3321 80.0375 49.1504 79.7316 50.1469L77.5774 57.1661C77.312 58.0317 77.3192 58.945 77.5986 59.8063L79.5962 65.963C80.1659 67.719 81.7886 68.937 83.6338 68.9937C83.6461 68.9941 83.6582 68.9943 83.6705 68.9945L83.7313 68.9955C83.744 68.9957 83.7566 68.9957 83.7695 68.9957C85.5835 68.9957 87.1853 67.905 87.8504 66.2168L90.1601 60.3538C90.5165 59.4497 90.5616 58.4384 90.2868 57.5063L88.1332 50.1945C87.8332 49.175 87.1962 48.338 86.3624 47.7831V30.3457L91.6206 27.8127C92.4638 27.4064 93 26.5532 93 25.617V23.6761C93 22.7401 92.4638 21.8867 91.6206 21.4804L47.5381 0.245995C46.8696 -0.0758948 46.0911 -0.0758948 45.4227 0.245995L1.37939 21.4619C0.536158 21.868 0 22.7213 0 23.6576V25.6357C0 26.5717 0.536158 27.4249 1.37939 27.8312ZM83.8134 63.1673L82.2823 58.4488L83.9153 53.1272L85.564 58.7235L83.8134 63.1673ZM72.8278 44.1162L48.1552 56.0012H44.8058L20.1334 44.1162V36.8654L45.4229 49.0475C45.7571 49.2085 46.1187 49.2888 46.4806 49.2888C46.8425 49.2888 47.2039 49.2085 47.5383 49.0475L72.828 36.8656L72.8278 44.1162ZM46.4804 5.14667L86.9617 24.6466L74.53 30.635C74.4205 30.6697 74.3125 30.7105 74.2072 30.761L46.4804 44.1174L18.7538 30.761C18.6487 30.7105 18.5407 30.6697 18.4314 30.635L5.99951 24.6464L46.4804 5.14667Z"
          fill="#00A39B"
        />
      </svg>
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