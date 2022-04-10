import { Question, Answer } from '../../models'
import { Form, Formik } from 'formik'
import React, { useContext, useState } from 'react'
import { FormAnswer, FormCtx, FormValues } from '../../utils/FormContext'
import { ChooseFormType } from '../../components/DynamicForm/ChooseFormType'
import { Button } from '../../components/FormStyles/Button'
import NavBar from '../../components/Critical/NavBar'
import styled from 'styled-components'
import SideProgressBar from '../../components/Critical/SideProgressBar'
import { buildResults } from '../../components/DynamicForm/MyResult'
import { jsPDF } from 'jspdf'
import { COLORS } from '../../constants/colors'
import { GetStaticProps } from 'next'
import csvToQuestionArray from '../../constants/csv_parser'

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
`
const GreySideBar = styled.div`
  width: 30%;
  min-width: 200px;
  max-width: 300px;
  background-color: ${COLORS.LIGHT_GREY};
  height: 100%;
  border-right: 1px solid ${COLORS.SHADOW_GREY};
`
// horizontal box
const HorizontalBox = styled.div`
  display: flex;
  align-items: stretch;
  width: 100%;
  flex-direction: row;
  height: 100%;
  justify-content: center;
`
const TitleText = styled.h1`
  font-size: 26px;
  margin-bottom: 20px;
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

  function getNextQuestion(answer: Answer): Question {
    const id: number = answer.route
    return questions[id]
  }

  function _updateCurrentAnswer(
    questionId: string,
    answerId: string,
    userAnswer?: string
  ) {
    const answer = {
      questionId,
      answerId,
      userAnswer,
    }

    setCurrentAnswer(answer)
  }

  /**
   * handles getting the next question based on current question's answer
   */
  function _handleNext() {
    if (!currentAnswer) {
      return
    }
    if (formValues.formAnswers.hasOwnProperty(currentQuestion.id)) {
      _handleQuestionExists()
    } else {
      const nextQuestion = getNextQuestion(
        questions[currentQuestion.id].answers[parseInt(currentAnswer.answerId)]
      )
      setQuestionHistory((questionHistory) => [
        ...questionHistory,
        nextQuestion,
      ])
      formValues.formAnswers[currentQuestion.id] = currentAnswer
      setCurrentQuestion(nextQuestion)
      if (formValues.formAnswers[nextQuestion.id]) {
        setCurrentAnswer(formValues.formAnswers[nextQuestion.id])
      }
    }
    setCurrentIndex(currentIndex + 1)
  }

  /**
   * Modifies question history and routes form depending on whether answer has been changed
   */
  function _handleQuestionExists() {
    const nextQuestion = getNextQuestion(
      questions[currentQuestion.id].answers[parseInt(currentAnswer.answerId)]
    )
    if (
      formValues.formAnswers[currentQuestion.id]['answerId'] !==
      currentAnswer['answerId']
    ) {
      for (let i = currentIndex + 1; i < questionHistory.length; i++) {
        delete formValues.formAnswers[questionHistory[i].id]
      }
      const questionSlice = questionHistory.slice(0, currentIndex + 1)
      const nextQuestion = getNextQuestion(
        questions[currentQuestion.id].answers[parseInt(currentAnswer.answerId)]
      )
      setQuestionHistory([...questionSlice, nextQuestion])
      formValues.formAnswers[currentQuestion.id] = currentAnswer
      setCurrentQuestion(nextQuestion)
      if (formValues.formAnswers[nextQuestion.id]) {
        setCurrentAnswer(formValues.formAnswers[nextQuestion.id])
      }
    } else {
      const nextQuestion = getNextQuestion(
        questions[currentQuestion.id].answers[parseInt(currentAnswer.answerId)]
      )
      setCurrentQuestion(nextQuestion)
      if (formValues.formAnswers[nextQuestion.id]) {
        setCurrentAnswer(formValues.formAnswers[nextQuestion.id])
      }
    }
  }

  function _handleBack() {
    if (currentIndex !== 0) {
      const newQuestion = questionHistory[currentIndex - 1]
      if (currentQuestion.id.toString() === currentAnswer.questionId) {
        formValues.formAnswers[currentQuestion.id] = currentAnswer
        setCurrentAnswer(formValues.formAnswers[newQuestion.id])
      }
      setCurrentQuestion(newQuestion)
      setCurrentIndex(currentIndex - 1)
    }
  }

  function _buildDoc(doc: jsPDF, answers: FormAnswer[]): jsPDF {
    const results = ''
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
      if (item.userAnswer != undefined) {
        doc
          .setFont('times', 'normal')
          .text('\t' + item.userAnswer + '\n\n', x, y)
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
    const results = buildResults(values['formAnswers'], questions)
    doc = _buildDoc(doc, results)
    doc.save('a4.pdf')
  }

  return (
    <Main>
      <NavBar></NavBar>
      <HorizontalBox>
        <GreySideBar>
          <SideProgressBar />
        </GreySideBar>
        <TitleText>{currentQuestion.section}</TitleText>
        <Formik
          initialValues={formValues}
          onSubmit={(values: FormValues, { setSubmitting }) => {
            if (updateFormValues) {
              updateFormValues(values)
            }
            _handleNext()
            if (currentQuestion.type === 'RESULT') {
              _handleSubmit(values)
              setSubmitting(false)
            }
          }}
        >
          <Form style={{ width: '100%', display: 'flex' }}>
            <FormContentWrapper>
              <QuestionDisplayWrapper>
                <TitleText>Pet Lover Section</TitleText>
                <ChooseFormType
                  question={currentQuestion}
                  onChange={_updateCurrentAnswer}
                  answers={formValues.formAnswers[currentQuestion.id]}
                  questions={questions}
                />
              </QuestionDisplayWrapper>
              <BottomButtonBar>
                <ButtonContainer>
                  <BackButton type="button" onClick={() => _handleBack()}>
                    Back
                  </BackButton>
                  <NextEndButton type="submit">
                    {currentQuestion.type === 'RESULT' ? 'End' : 'Next'}
                  </NextEndButton>
                </ButtonContainer>
              </BottomButtonBar>
            </FormContentWrapper>
          </Form>
        </Formik>
      </HorizontalBox>
    </Main>
  )
}

export default DynamicPOC
