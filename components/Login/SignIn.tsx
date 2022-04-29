import React from 'react'
import { Form, Formik, Field } from 'formik'
import { StyledTextInput } from '../FormStyles/InputBox'
import * as Yup from 'yup'
import { EStyledButton, Container, SubContainer } from './LoginStyling'
import styled from 'styled-components'
import Link from 'next/link'
import { PasswordInputBox } from '../FormStyles/PasswordInputBox'

export const RememberSignIn = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 25px;
  width: 100%;
`

export const RememberDiv = styled.div`
  margin-top: 2%;
`

interface FormValues {
  email: string
  password: string
}

// component for the signin page - includes form (and styling) for validation
function SignIn() {
  const initialVal: FormValues = {
    email: '',
    password: '',
  }

  return (
    <Formik
      initialValues={initialVal}
      validationSchema={Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().required('Required'),
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
          <SubContainer>
            <StyledTextInput
              width={356}
              height={42}
              name="email"
              placeholder="Email"
              type="text"
            />

            <PasswordInputBox
              width={356}
              height={42}
              placeholder="Password"
              name="password"
            />
          </SubContainer>
          <EStyledButton type="submit" primary={true}>
            Sign In
          </EStyledButton>
        </Container>
      </Form>
    </Formik>
  )
}

export default SignIn
