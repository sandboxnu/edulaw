import { Question, Answer } from '../../models'
import { Form, Formik } from 'formik'
import React, { useContext, useState } from 'react'
import {
  FormAnswer,
  FormCtx,
  FormResult,
  FormValues,
} from '../../utils/FormContext'
import { ChooseFormType } from '../../components/DynamicForm/ChooseFormType'
import { Button } from '../../components/FormStyles/Button'
import NavBar from '../../components/Critical/NavBar'
import styled from 'styled-components'
import SideProgressBar from '../../components/Critical/SideProgressBar'
import { buildResults } from '../../components/DynamicForm/MyResult'
import { jsPDF } from 'jspdf'
import { COLORS } from '../../constants/colors'
import { CUTOFFS } from '../../constants/responsive'
import { GetStaticProps } from 'next'
import csvToQuestionArray from '../../constants/csv_parser'
import { QuestionType } from '../../models/question'

let startingAnswer: FormAnswer

const Main = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: stretch;
`
const BottomButtonBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: end;
  align-items: center;
  height: 80px;
  border-top: 1px solid ${COLORS.SHADOW_GREY};
  background-color: ${COLORS.LIGHT_GREY};
`
const ButtonContainer = styled.div`
  margin-right: 80px;
  @media (max-width: ${CUTOFFS.mobile}px) {
    margin-right: 25px;
  }
`
const FormContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
const QuestionDisplayWrapper = styled.div`
  padding-left: 10%;
  margin-top: 64px;
`

const NextEndButton = styled(Button)`
  background: ${COLORS.EDLAW_BLUE};
  color: white;
  border: none;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`
const BackButton = styled(Button)`
  border: none;
  width: 80px;
  color: ${COLORS.EDLAW_BLUE};
  background-color: transparent;
`

// horizontal box
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
const TitleText = styled.h1`
  font-size: 26px;
  margin-bottom: 20px;
  font-family: Source Sans Pro;
`
const FormStyled = styled(Form)`
  width: 100%;
  flex-grow: 1;
  display: flex;
`

const files = {
  animalForm: '../../../constants/Animal Form.csv',
  actualForm: '../../../constants/EdLaw Combined Flowchart.csv',
}

export const getStaticProps: GetStaticProps = (context) => {
  const file = files.animalForm
  const questions = csvToQuestionArray(file)

  return {
    props: {
      questions: questions,
    },
  }
}

const DynamicPOC: React.FC<{ questions: Question[] }> = ({ questions }) => {
  const startingQuestion: Question = questions[0]

  const { formValues, updateFormValues } = useContext(FormCtx)

  const [currentQuestion, setCurrentQuestion] = useState(startingQuestion)
  const [currentAnswer, setCurrentAnswer] = useState(startingAnswer)
  const [questionHistory, setQuestionHistory] = useState([startingQuestion])
  const [currentIndex, setCurrentIndex] = useState(0)

  /**
   * Returns the next question based on whether or not current question is a radio, continue, or text,
   * taking advantage that continue and text qs only have one route after (or should..)
   */
  function getNextQuestion(q: Question, a: FormAnswer): Question {
    return questions[
      q.answers[a.type === QuestionType.RADIO ? a.answerId : 0].route
    ]
  }

  /**
   * Handles changing the old question to the given question
   */
  function _handleQuestionChange(nextQuestion: Question) {
    formValues.formAnswers[currentQuestion.id] = currentAnswer
    setCurrentQuestion(nextQuestion)
    if (formValues.formAnswers[nextQuestion.id]) {
      setCurrentAnswer(formValues.formAnswers[nextQuestion.id])
    }
  }

  /**
   * handles getting the next question based on current question's answer
   */
  function _handleNext() {
    // if the question is not answered, don't let the user continue
    if (!currentAnswer || currentAnswer.questionId !== currentQuestion.id) {
      return
    }
    if (formValues.formAnswers.hasOwnProperty(currentQuestion.id)) {
      _handleQuestionExists()
    } else {
      const nextQuestion = getNextQuestion(currentQuestion, currentAnswer)
      setQuestionHistory([...questionHistory, nextQuestion])
      _handleQuestionChange(nextQuestion)
    }
    setCurrentIndex(currentIndex + 1)
  }

  /**
   * Modifies question history and routes form depending on whether answer has been changed
   */
  function _handleQuestionExists() {
    const nextQuestion = getNextQuestion(currentQuestion, currentAnswer)
    const nextAnswer = formValues.formAnswers[currentQuestion.id]
    // if the exisitng question is a radio, and they're not the same answer
    if (
      nextAnswer.type === QuestionType.RADIO &&
      currentAnswer.type === QuestionType.RADIO &&
      nextAnswer.answerId !== currentAnswer.answerId
    ) {
      for (let i = currentIndex + 1; i < questionHistory.length; i++) {
        delete formValues.formAnswers[questionHistory[i].id]
      }
      const questionSlice = questionHistory.slice(0, currentIndex + 1)
      setQuestionHistory([...questionSlice, nextQuestion])
    }
    _handleQuestionChange(nextQuestion)
  }

  function _handleBack() {
    // TODO: in redesign, if we disable the back button on the first question, we can get rid of this check
    if (currentIndex !== 0) {
      const prevQuestion = questionHistory[currentIndex - 1]
      if (currentQuestion.id === currentAnswer.questionId) {
        formValues.formAnswers[currentQuestion.id] = currentAnswer
        setCurrentAnswer(formValues.formAnswers[prevQuestion.id])
      }
      setCurrentQuestion(prevQuestion)
      setCurrentIndex(currentIndex - 1)
    }
  }

  function _buildDoc(doc: jsPDF, answers: FormResult[]): jsPDF {
    const x = 10
    let y = 10
    const y_inc = 8

    answers.forEach(function (item) {
      doc.setFont('times', 'bold').text(item.question + '\n', x, y)
      y += y_inc
      if (item.answer != null) {
        doc.setFont('times', 'normal').text('\t' + item.answer + '\n\n', x, y)
        y += y_inc
      }
      if (item.formAnswer.type === QuestionType.TEXT) {
        doc
          .setFont('times', 'normal')
          .text('\t' + item.formAnswer.userAnswer + '\n\n', x, y)
        y += y_inc
      }
    })

    return doc
  }

  function _handleSubmit(values: FormValues) {
    // This is where whatever we do at the end of the form (storing, making pdf, etc) would happen
    alert(JSON.stringify(values))
    if (updateFormValues) {
      updateFormValues(values)
    }

    let doc = new jsPDF()
    const results = buildResults(values.formAnswers, questions)
    doc = _buildDoc(doc, results)
    doc.save('a4.pdf')
  }

  return (
    <Main>
      <NavBar />
      <HorizontalBox>
        <SideProgressBar />
        <Formik
          initialValues={formValues}
          onSubmit={(values: FormValues, { setSubmitting }) => {
            if (updateFormValues) {
              updateFormValues(values)
            }
            _handleNext()
            if (currentQuestion.type === QuestionType.RESULT) {
              _handleSubmit(values)
              setSubmitting(false)
            }
          }}
        >
          <FormStyled>
            <FormContentWrapper>
              <QuestionDisplayWrapper>
                <TitleText>{currentQuestion.section}</TitleText>
                <ChooseFormType
                  question={currentQuestion}
                  onChange={setCurrentAnswer}
                  answer={formValues.formAnswers[currentQuestion.id]}
                  questionHistory={questionHistory}
                />
              </QuestionDisplayWrapper>
              <BottomButtonBar>
                <ButtonContainer>
                  <BackButton type="button" onClick={() => _handleBack()}>
                    Back
                  </BackButton>
                  <NextEndButton type="submit">
                    {currentQuestion.type === QuestionType.RESULT
                      ? 'End'
                      : 'Next'}
                  </NextEndButton>
                </ButtonContainer>
              </BottomButtonBar>
            </FormContentWrapper>
          </FormStyled>
        </Formik>
      </HorizontalBox>
    </Main>
  )
}

export default DynamicPOC
