import React from 'react'
import { Form, Formik, Field } from 'formik'
import { StyledTextInput } from '../FormStyles/InputBox'
import * as Yup from 'yup'
import {
  BackButton,
  EStyledButton,
  Container,
  SubContainer,
  Title,
  SubTitle,
} from '../Login/SignUp'
import styled from 'styled-components'

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

export const Test = styled.label`
  margin: 10px;
`

interface FormValues {
  email: string
  password: string
  checked: Array<string>
}

function SignIn() {
  const initialVal: FormValues = {
    email: '',
    password: '',
    checked: [],
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
          <BackButton type="button">&lt; Back</BackButton>
          <Title>Welcome back!</Title>
          <SubTitle>Please sign in.</SubTitle>
          <SubContainer>
            <StyledTextInput
              width="600px"
              height="53px"
              name="email"
              placeholder="Email"
              type="text"
            />
            <StyledTextInput
              width="600px"
              height="53px"
              name="password"
              placeholder="Password"
              type="password"
            />
          </SubContainer>
          <div>
            <p>Forgot password?</p>
          </div>
          <RememberSignIn>
            <RememberDiv>
              <Test>
                <Field type="checkbox" name="checked" value="Remember" />
                Remember me
              </Test>
            </RememberDiv>
            <EStyledButton type="submit" primary={true}>
              Sign In
            </EStyledButton>
          </RememberSignIn>
        </Container>
      </Form>
    </Formik>
  )
}

export default SignIn
