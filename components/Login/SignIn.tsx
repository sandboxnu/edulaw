import React from 'react'
import { Form, Formik } from 'formik'
import { StyledTextInput } from '../FormStyles/InputBox'
import * as Yup from 'yup'
import { EStyledButton, Container, SubContainer } from './LoginStyling'
import { PasswordInputBox } from '../FormStyles/PasswordInputBox'

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
              cutoffWidth={271}
            />

            <PasswordInputBox
              width={356}
              height={42}
              placeholder="Password"
              name="password"
              cutoffWidth={271}
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
