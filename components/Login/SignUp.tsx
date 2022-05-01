import React from 'react'
import { StyledTextInput } from '../FormStyles/InputBox'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import { PasswordInputBox } from '../FormStyles/PasswordInputBox'
import { EStyledButton, Container, SubContainer } from './LoginStyling'

interface FormValues {
  email: string
  password: string
  confirmPass: string
}

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
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2))
          setSubmitting(false)
        }, 400)
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
