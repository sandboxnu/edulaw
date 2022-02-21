import React from 'react'
import { Form, Formik, Field } from 'formik'
import { StyledTextInput } from '../FormStyles/InputBox'
import { Button } from '../FormStyles/Button'
import * as Yup from 'yup'

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
        <div>
          <p>{'< Back'}</p> {/* placeholder */}
          <h1>Welcome back!</h1>
          <p>Please sign in</p>
          <div>
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
          </div>
          <div>
            <p>Forgot Username or Password?</p>
          </div>
          <div>
            <div>
              <label>
                <Field type="checkbox" name="checked" value="Remember" />
                Remember me
              </label>
            </div>
            <Button type="submit" primary={true}>
              Sign In
            </Button>
          </div>
        </div>
      </Form>
    </Formik>
  )
}

export default SignIn
