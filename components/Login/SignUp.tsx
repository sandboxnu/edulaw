import React from 'react'
import { StyledTextInput } from '../FormStyles/InputBox'
import { Button } from '../FormStyles/Button'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import styled from 'styled-components'

export const Container = styled.div`
  background-color: #ffffff;
  display: flex;
  justify-content: flex-start;
  flex-flow: column;
  gap: 20px;
  align-items: flex-start;
`

export const Title = styled.h2`
  font-family: Source Sans Pro;
  font-style: normal;
  font-weight: 600;
  font-size: 34px;
  line-height: 35px;
`

export const SubTitle = styled.p`
  margin-bottom: 30px;
`
export const SubContainer = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-end;
  justify-content: space-evenly;
  gap: 20px;
`

export const PasswordDiv = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
`
export const EmailDiv = styled.div``

export const EStyledButton = styled(Button)`
  margin-top: 20px;
  align-self: flex-end;
`

export const BackButton = styled.button`
  border: none;
  background: none;
  font-family: Source Sans Pro;
  font-style: normal;
  font-weight: 600;
  font-size: 28px;
  color: #5064c7;
  margin-bottom: 30px;
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
          <BackButton type="button"> &lt; Back </BackButton>
          <Title>Welcome</Title>
          <SubTitle>Let us get your account up and running.</SubTitle>
          <EmailDiv>
            <StyledTextInput
              width="330px"
              height="53px"
              name="email"
              placeholder="Email"
              type="text"
            />
          </EmailDiv>
          <SubContainer>
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
            <EStyledButton type="submit" primary={true}>
              Sign Up
            </EStyledButton>
          </SubContainer>
        </Container>
      </Form>
    </Formik>
  )
}

export default Signup
