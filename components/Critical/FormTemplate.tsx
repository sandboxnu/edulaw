import SideProgressBar from './SideProgressBar'
import NavBar from './NavBar'
import { CUTOFFS } from '../../constants/responsive'
import styled from 'styled-components'

import { BottomBar } from './BottomBar'

import { Form, Formik } from 'formik'
import { FormValues } from '../../utils/FormContext'

const FullPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: stretch;
`

const HorizontalBox = styled.div`
  display: flex;
  align-items: stretch;
  width: 100%;
  flex-direction: row;
  height: 100%;
  justify-content: center;
  @media (max-width: ${CUTOFFS.mobile}px) {
    flex-direction: column;
    justify-content: start;
  }
`
const FormContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
const FormStyled = styled(Form)`
  width: 100%;
  flex-grow: 1;
  display: flex;
`

const QuestionDisplayWrapper = styled.div`
  padding-left: 10%;
  padding-right: 10%;
  margin-top: 64px;
`

interface FormTemplateProps {
  onSubmit: (
    values: FormValues,
    { setSubmitting }: { setSubmitting: (submit: boolean) => void }
  ) => void
  initialValues: any
  onBack?: () => void
  nextButtonText?: string
  currentPage?: string
}

export const FormTemplate: React.FC<FormTemplateProps> = ({
  onBack,
  onSubmit,
  initialValues,
  nextButtonText = 'Next',
  children,
  currentPage,
}) => {
  return (
    <FullPageContainer>
      <NavBar />
      <HorizontalBox>
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
          <FormStyled>
            <SideProgressBar currentPage={currentPage} />
            <FormContentWrapper>
              <QuestionDisplayWrapper>{children}</QuestionDisplayWrapper>
              <BottomBar onBack={onBack} nextButtonText={nextButtonText} />
            </FormContentWrapper>
          </FormStyled>
        </Formik>
      </HorizontalBox>
    </FullPageContainer>
  )
}
