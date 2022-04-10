import React from 'react'
import { StyledTextInput } from '../FormStyles/InputBox'
import { Button } from '../FormStyles/Button'
import { ErrorMessage, Form, Formik } from 'formik'
import * as Yup from 'yup'
import styled from 'styled-components'
import Link from 'next/link'
import { PasswordInputBox } from '../FormStyles/PasswordInputBox'
// import 'next-auth'
import {
  BackButton,
  EStyledButton,
  Container,
  SubContainer,
  Title,
  SubTitle,
} from './LoginStyling'

export const PasswordDiv = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: flex-start;
  gap: 20px;
`

interface FormValues {
  email: string
  password: string
  confirmPass: string
}

// async function createUser() {

// }

// component for signup page - includes form and validation for email and password,
// and ensures that passwords are the same
function Signup() {
  const initialVal: FormValues = {
    email: '',
    password: '',
    confirmPass: '',
  }

  return (
    <Formik
      initialValues={initialVal}
      validationSchema={Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().required('Required'),
        confirmPass: Yup.string()
          .required('Required')
          .oneOf([Yup.ref('password'), null], 'Passwords must match'),
      })}
      // add user to the database !!!
      onSubmit={async (values, { setSubmitting }) => {
        const result = await fetch('/api/auth/signup', {
          method: 'POST',
          body: JSON.stringify(values),
        })

        if (result.status === 200) {
          console.log('Valid')
        } else {
          const errMessage = await result.json()
          alert(errMessage.error)
        }

        return result
      }}
    >
      <Form>
        <Container>
          <Link href="/home" passHref>
            <BackButton type="button"> &lt; Back </BackButton>
          </Link>
          <Title>Welcome</Title>
          <SubTitle>Let us get your account up and running.</SubTitle>
          <div>
            <StyledTextInput
              width="330px"
              height="53px"
              name="email"
              placeholder="Email"
              type="text"
            />
          </div>
          <SubContainer>
            <PasswordDiv>
              <PasswordInputBox
                width="330px"
                height="53px"
                placeholder="Password"
                name="password"
              />
              <PasswordInputBox
                width="330px"
                height="53px"
                placeholder="Confirm Password"
                name="confirmPass"
              />
            </PasswordDiv>
            <EStyledButton type="submit" primary={true}>
              Sign Up
            </EStyledButton>
          </SubContainer>
        </Container>
      </Form>
    </Formik>
  )
}

export default Signup
