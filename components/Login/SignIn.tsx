import React, { useEffect } from 'react'
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
} from './LoginStyling'
import styled from 'styled-components'
import Link from 'next/link'
import { PasswordInputBox } from '../FormStyles/PasswordInputBox'
import { signIn, useSession } from 'next-auth/react'
import { SessionProvider } from 'next-auth/react'
import { useRouter } from 'next/router'

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
  checked: Array<string>
}

// component for the signin page - includes form (and styling) for validation
function SignIn() {
  const router = useRouter()
  const { data } = useSession()
  const initialVal: FormValues = {
    email: '',
    password: '',
    checked: [],
  }

  // check if the user is invalid
  useEffect(() => {
    if (data !== null && data !== undefined) {
      if (data.user?.id) {
        router.push('/DynamicPOC')
      } else {
        alert(data.user?.name)
      }
    }
  }, [data])

  return (
    <Formik
      initialValues={initialVal}
      validationSchema={Yup.object({
        email: Yup.string().email('Invalid email address').required('Required'),
        password: Yup.string().required('Required'),
      })}
      // check if user is in database and sign them in
      onSubmit={async (values) => {
        // do submission shit here
        await signIn('credentials', {
          redirect: false,
          username: values.email,
          password: values.password,
        })

        console.log(values.email)
        console.log(values.password)
      }}
    >
      <Form>
        <Container>
          <Link href="/home" passHref>
            <BackButton type="button">&lt; Back</BackButton>
          </Link>
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

            <PasswordInputBox
              width="600px"
              height="53px"
              placeholder="Password"
              name="password"
            />
          </SubContainer>
          <Link href="/forgotpassword" passHref>
            <p>
              Forgot <strong>Password?</strong>
            </p>
          </Link>
          <RememberSignIn>
            <RememberDiv>
              <label>
                <Field type="checkbox" name="checked" value="Remember" />
                Remember me
              </label>
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
