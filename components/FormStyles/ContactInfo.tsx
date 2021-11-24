import styled from 'styled-components'
import React from 'react'
import { InputBox } from '../FormStyles/InputBox'
import Typography from '@mui/material/Typography'
import { Button } from '../FormStyles/Button'

export const ContactColumn = styled.div`
  display: flex;
  flex-direction: column;

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
  justify-content: space-evenly;
`

// may be used for everything?
export const WrapperDiv = styled.div`
  margin: 7%;
`

// not too familiar with styled component usage guidelines..do I just make a const for everything??

function ContactInfo() {
  return (
    <div>
      <WrapperDiv>
        <Typography variant="h1">Contact Info</Typography>
        <p>
          The PRS officer will only contact you using the information you
          provide below.{' '}
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

        <Button primary={false}>Back</Button>
        <Button primary={true}>Next</Button>
      </WrapperDiv>
    </div>
  )
}

export default ContactInfo
