import { Form, Formik } from 'formik'
import { TitleText } from './form'
import styled from 'styled-components'
import { QuestionText } from '../components/FormStyles/QuestionText'
import { StyledTextInput } from '../components/FormStyles/InputBox'
import { FormTemplate } from './form/FormTemplate'

const ContactPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const InputRow = styled.div`
  display: flex;
  row-gap: 12px;
  column-gap: 20px;
  max-width: 800px;
  flex-flow: row wrap;
`
const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`

const FormWrapper = styled.div`
  margin-top: 30px;
`
function contactInfo() {
  return (
    <FormTemplate
      initialValues={{
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        state: '',
        city: '',
        address: '',
        zip: '',
      }}
      onSubmit={(values, actions) => {
        alert(JSON.stringify(values, null, 2))
        actions.setSubmitting(false)
      }}
      nextButtonText={'Next'}
    >
      <TitleText>Contact Info</TitleText>
      <QuestionText>
        The PRS officer will only contact you using the information you provide
        below.
      </QuestionText>
      <FormContainer>
        <InputRow>
          <StyledTextInput
            width={330}
            height={42}
            placeholder="First Name"
            name="firstName"
          />
          <StyledTextInput
            width={330}
            height={42}
            placeholder="Last Name"
            name="lastName"
          />
        </InputRow>
        <InputRow>
          <StyledTextInput
            width={330}
            height={42}
            placeholder="Phone"
            name="phone"
          />
          <StyledTextInput
            width={330}
            height={42}
            placeholder="Email"
            name="email"
          />
        </InputRow>
        <InputRow>
          <StyledTextInput
            width={330}
            height={42}
            placeholder="State"
            name="state"
          />
          <StyledTextInput
            width={330}
            height={42}
            placeholder="City"
            name="city"
          />
          <StyledTextInput
            width={330}
            height={42}
            placeholder="Address"
            name="address"
          />
          <StyledTextInput
            width={330}
            height={42}
            placeholder="Zip Code"
            name="zip"
          />
        </InputRow>
      </FormContainer>
    </FormTemplate>
  )
}
export default contactInfo
