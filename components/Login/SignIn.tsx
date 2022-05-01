import React, { useEffect } from 'react'
import { Form, Formik, Field } from 'formik'
import { StyledTextInput } from '../FormStyles/InputBox'
import * as Yup from 'yup'
import { EStyledButton, Container, SubContainer } from './LoginStyling'
import { PasswordInputBox } from '../FormStyles/PasswordInputBox'
import { signIn, useSession } from 'next-auth/react'
import { SessionProvider } from 'next-auth/react'
import { NextRouter, useRouter } from 'next/router'
import { Session } from 'next-auth'

interface FormValues {
  email: string
  password: string
}

// checks if the user is able to log in
export function login(data: Session | null, router: NextRouter) {
  if (data?.user) {
    if (data.user.id) {
      router.push('/form')
    } else {
      alert(data.user.name)
      data.user = undefined
    }
  }
}

// component for the signin page - includes form (and styling) for validation
function SignIn() {
  const router = useRouter()
  const { data } = useSession()
  const initialVal: FormValues = {
    email: '',
    password: '',
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
      })}
      // check if user is in database and sign them in
      onSubmit={async (values) => {
        // do submission shit here
        await signIn('credentials', {
          redirect: false,
          username: values.email,
          password: values.password,
        })
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
