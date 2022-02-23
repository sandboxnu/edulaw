import React from 'react'
import { Form, Formik, Field } from 'formik'
import { StyledTextInput } from '../FormStyles/InputBox'
import * as Yup from 'yup'
import {
  BackButton,
  EStyledButton,
  Container,
  Title,
  SubTitle,
} from '../Login/SignUp'
import { RememberSignIn } from '../Login/SignIn'
import styled from 'styled-components'
import Link from 'next/link'

export const TextButtonDiv = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: flex-end;
  gap: 25px;
`

function ForgotPassword() {
  return (
    <Formik
      initialValues={{ email: '' }}
      validationSchema={Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2))
          setSubmitting(false)
        }, 400)
      }}
    >
      <Form>
        <Container>
          <Link href="/signin" passHref>
            <BackButton type="button"> &lt; Back to Login </BackButton>
          </Link>
          <Title>Forgot Password?</Title>
          <SubTitle>
            No worries. Enter the email you used to create your account and we
            will send it over right away!{' '}
          </SubTitle>
          <TextButtonDiv>
            <StyledTextInput
              width="600px"
              height="53px"
              name="email"
              placeholder="Email"
              type="text"
            />
            <EStyledButton type="submit" primary={true}>
              Send
            </EStyledButton>
          </TextButtonDiv>
        </Container>
      </Form>
    </Formik>
  )
}

export default ForgotPassword
