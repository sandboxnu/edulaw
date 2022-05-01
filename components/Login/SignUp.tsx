import React, { useEffect } from 'react'
import { StyledTextInput } from '../FormStyles/InputBox'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { PasswordInputBox } from '../FormStyles/PasswordInputBox'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { login } from '../Login/SignIn'
import { EStyledButton, Container, SubContainer } from './LoginStyling'
import styled from 'styled-components'

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

// component for signup page - includes form and validation for email and password,
// and ensures that passwords are the same
function Signup() {
  const { data } = useSession()
  const router = useRouter()
  const initialVal: FormValues = {
    email: '',
    password: '',
    confirmPass: '',
  }

  // check if the user is invalid
  // checks when data is changed
  useEffect(() => login(data, router), [data])

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

        // checks if the user can be added and signs them in
        if (result.status === 200) {
          await signIn('credentials', {
            redirect: false,
            username: values.email,
            password: values.password,
          })
        } else {
          const errMessage = await result.json()
          alert(errMessage.error)
        }

        return result
      }}
    >
      <Form>
        <Container>
          <StyledTextInput
            width={356}
            height={42}
            name="email"
            placeholder="Email"
            type="text"
            cutoffWidth={271}
          />
          <SubContainer>
            <PasswordInputBox
              width={356}
              height={42}
              placeholder="Password"
              name="password"
              cutoffWidth={271}
            />
            <PasswordInputBox
              width={356}
              height={42}
              placeholder="Confirm Password"
              name="confirmPass"
              cutoffWidth={271}
            />
          </SubContainer>
          <EStyledButton type="submit">Sign Up</EStyledButton>
        </Container>
      </Form>
    </Formik>
  )
}

export default Signup
