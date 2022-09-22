import SideProgressBar from './SideProgressBar'
import NavBar from './NavBar'
import { CUTOFFS } from '../../constants/responsive'
import styled from 'styled-components'
import { BottomBar } from './BottomBar'
import { Form, Formik } from 'formik'
import { FormValues } from '../../utils/FormContext'
import { LoadingSpinner } from '../LoadingSpinner'
import React, { ReactNode } from 'react'

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

const OtherFormStyled = styled.form`
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
  initialValues?: FormValues
  onBack?: () => void
  nextButtonText?: string
  currentPage?: string
  loaded: boolean
}

export const FormTemplate: React.FC<FormTemplateProps> = ({
  onBack,
  onSubmit,
  initialValues,
  nextButtonText = 'Next',
  children,
  currentPage = 'Guided Questions',
  loaded,
}) => {
  return (
    <FullPageContainer>
      <NavBar />
      <HorizontalBox>
        {((formElements: React.ReactFragment) => {
          return initialValues ? (
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
              <FormStyled>{formElements}</FormStyled>
            </Formik>
          ) : (
            <OtherFormStyled
              onSubmit={(evt: React.SyntheticEvent) => {
                onSubmit({ formAnswers: {} }, { setSubmitting: console.log })
                evt.preventDefault()
              }}
            >
              {formElements}
            </OtherFormStyled>
          )
        })(
          <React.Fragment>
            <SideProgressBar currentPage={currentPage} />
            <FormContentWrapper>
              <QuestionDisplayWrapper>
                {loaded ? children : <LoadingSpinner />}
              </QuestionDisplayWrapper>
              <BottomBar onBack={onBack} nextButtonText={nextButtonText} />
            </FormContentWrapper>
          </React.Fragment>
        )}
      </HorizontalBox>
    </FullPageContainer>
  )
}
