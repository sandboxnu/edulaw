import styled from 'styled-components'
import React from 'react'
import { InputBox } from '../FormStyles/InputBox'
import Typography from '@mui/material/Typography'
import { Button } from '../FormStyles/Button'

export const ContactColumn = styled.div`
  display: flex;
  flex-direction: column;
  padding-right: 50px;

  > * {
    &:first-child,
    &:nth-child(2) {
      margin-bottom: 40px;
    }
  }

  > * {
    &:nth-child(n + 3) {
      margin-bottom: 10px;
    }
  }
`
export const ContactContent = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  align-items: stretch;
`

export const ButtonRow = styled.div`
  display: flex;
  width: 93%;
  justify-content: space-between;
  margin-top: 15%;
`

// at this point i'm just trolling
export const OuterDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const WrapperDiv = styled.div`
  margin: 7%;
  > * {
    &:first-child {
      margin-bottom: 10px;
    }

    &:nth-child(2) {
      margin-bottom: 30px;
    }
  }
`

function ContactInfo() {
  return (
    <OuterDiv>
      <WrapperDiv>
        <Typography variant="h1">Contact Info</Typography>
        <p>
          The PRS officer will only contact you using the information you
          provide below.
        </p>
        <ContactContent>
          <ContactColumn>
            <InputBox
              width="330px"
              height="53px"
              type="text"
              placeholder="First name"
            />
            <InputBox
              width="330px"
              height="53px"
              type="text"
              placeholder="Phone"
            />
            <InputBox
              width="330px"
              height="53px"
              type="text"
              placeholder="Address"
            />
            <InputBox
              width="330px"
              height="53px"
              type="text"
              placeholder="State"
            />
          </ContactColumn>
          <ContactColumn>
            <InputBox
              width="330px"
              height="53px"
              type="text"
              placeholder="Last name"
            />
            <InputBox
              width="330px"
              height="53px"
              type="text"
              placeholder="E-mail"
            />
            <InputBox
              width="330px"
              height="53px"
              type="text"
              placeholder="City"
            />
            <InputBox
              width="330px"
              height="53px"
              type="text"
              placeholder="Zip"
            />
          </ContactColumn>
        </ContactContent>
        <ButtonRow>
          <Button primary={false}>placehold</Button>
          <Button primary={true}>placehold</Button>
        </ButtonRow>
      </WrapperDiv>
    </OuterDiv>
  )
}

export default ContactInfo
