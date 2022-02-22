import React from 'react'
import { StyledTextInput } from '../FormStyles/InputBox'
import { Button } from '../FormStyles/Button'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import styled from 'styled-components'
// NO legit STYLING YET

export const Container = styled.div`
  width: 600px;
  height: 500px;
  background-color: #ffffff;
  display: flex;
  justify-content: space-evenly;
  flex-flow: column;
  align-items: flex-start;
`

export const PasswordDiv = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: space-evenly;
  align-items: center;
  gap: 20px;
`

interface FormValues {
  email: string
  password: string
  confirmPass: string
}

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
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2))
          setSubmitting(false)
        }, 400)
      }}
    >
      <Form>
        <Container>
          <p>Back</p>
          <h1>Welcome</h1>
          <p>Let us get your account up and running.</p>
          <div>
            <StyledTextInput
              width="330px"
              height="53px"
              name="email"
              placeholder="Email"
              type="text"
            />
          </div>
          <PasswordDiv>
            <StyledTextInput
              width="330px"
              height="53px"
              name="password"
              placeholder="Password"
              type="password"
            />
            <StyledTextInput
              width="330px"
              height="53px"
              name="confirmPass"
              placeholder="Confirm Password"
              type="password"
            />
          </PasswordDiv>
          <Button type="submit" primary={true}>
            Sign Up
          </Button>
        </Container>
      </Form>
    </Formik>
  )
}

export default Signup
