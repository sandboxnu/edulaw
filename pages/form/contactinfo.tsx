import styled from 'styled-components'
import {
  InfoText,
  QuestionText,
  TitleText,
} from '../../components/FormStyles/QuestionText'
import { StyledTextInput } from '../../components/FormStyles/InputBox'
import { FormTemplate } from '../../components/Critical/FormTemplate'
import { useRouter } from 'next/router'

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

function ContactInfo() {
  const router = useRouter()
  const allInputFields: [string, string][][] = [
    [
      ['First Name', 'firstName'],
      ['Last Name', 'lastName'],
    ],
    [
      ['Phone', 'phone'],
      ['Email', 'email'],
    ],
    [
      ['Address', 'address'],
      ['City', 'city'],
      ['State', 'state'],
      ['Zipcode', 'zip'],
    ],
  ]
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
        router.push('/form/additionalinfo')
        actions.setSubmitting(false)
      }}
    >
      <TitleText>Contact Info</TitleText>
      <InfoText>
        The PRS officer will only contact you using the information you provide
        below.
      </InfoText>
      <FormContainer>
        {allInputFields.map((inputRow) => (
          <InputRow key={inputRow.toString()}>
            {inputRow.map((singleInput) => (
              <StyledTextInput
                key={singleInput[0]}
                width={330}
                height={42}
                placeholder={singleInput[0]}
                name={singleInput[1]}
              />
            ))}
          </InputRow>
        ))}
      </FormContainer>
    </FormTemplate>
  )
}
export default ContactInfo
