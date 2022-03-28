import styled from 'styled-components'
import React from 'react'
import { StyledTextInput } from '../FormStyles/InputBox'
import Typography from '@mui/material/Typography'
import { Button } from '../FormStyles/Button'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'

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

interface FormValues {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  address: string
  city: string
  state: string
  zip: string
}

// contact form that includes validation for the below fields
const ContactFormik: React.FC = () => {
  // function ContactInfo() {
  const initValues: FormValues = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    zip: '',
  }

  const phoneCheck =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

  return (
    <Formik
      initialValues={initValues}
      validationSchema={Yup.object({
        firstName: Yup.string()
          .max(15, 'Must be 15 characters or less')
          .required('Required'),
        lastName: Yup.string()
          .max(20, 'Must be 20 characters or less')
          .required('Required'),
        email: Yup.string().email('Invalid email address').required('Required'),
        phoneNumber: Yup.string()
          .matches(phoneCheck, 'Phone number is not valid')
          .required('Required'),
        address: Yup.string()
          .max(60, 'Must be 60 characters or less')
          .required('Required'),
        city: Yup.string()
          .max(30, 'Must be 30 characters or less')
          .required('Required'),
        state: Yup.string()
          .max(2, 'state abbreviation only')
          .required('Required'),
        zip: Yup.string()
          .required()
          .matches(/^[0-9]+$/, 'Must be only digits')
          .min(5, 'Must be exactly 5 digits')
          .max(5, 'Must be exactly 5 digits'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2))
          setSubmitting(false)
        }, 400)
      }}
    >
      <Form>
        <OuterDiv>
          <WrapperDiv>
            <Typography variant="h1">Contact Info</Typography>
            <p>
              The PRS officer will only contact you using the information you
              provide below.
            </p>
            <ContactContent>
              <ContactColumn>
                <StyledTextInput
                  width="330px"
                  height="53px"
                  name="firstName"
                  placeholder="First Name"
                />

                <StyledTextInput
                  width="330px"
                  height="53px"
                  name="phoneNumber"
                  placeholder="Phone"
                />

                <StyledTextInput
                  width="330px"
                  height="53px"
                  name="address"
                  placeholder="Address"
                />

                <StyledTextInput
                  width="330px"
                  height="53px"
                  name="state"
                  placeholder="State"
                />
              </ContactColumn>
              <ContactColumn>
                <StyledTextInput
                  width="330px"
                  height="53px"
                  name="lastName"
                  placeholder="Last name"
                />

                <StyledTextInput
                  width="330px"
                  height="53px"
                  name="email"
                  placeholder="E-mail"
                />

                <StyledTextInput
                  width="330px"
                  height="53px"
                  name="city"
                  placeholder="City"
                />

                <StyledTextInput
                  width="330px"
                  height="53px"
                  name="zip"
                  placeholder="Zip"
                />
              </ContactColumn>
            </ContactContent>
            <ButtonRow>
              <Button type="submit" primary={false}>
                submit-test
              </Button>
              <Button type="button" primary={true}>
                placehold
              </Button>
            </ButtonRow>
          </WrapperDiv>
        </OuterDiv>
      </Form>
    </Formik>
  )
}

export default ContactFormik
