import { Question } from '../../models'
import { Form, Formik } from 'formik'
import React, { useState, useEffect } from 'react'
import {
  emptyFormValues,
  FormAnswer,
  FormCtx,
  FormResult,
  FormValues,
} from '../../utils/FormContext'
import { ChooseFormType } from '../../components/DynamicForm/ChooseFormType'
import NavBar from '../../components/Critical/NavBar'
import styled from 'styled-components'
import SideProgressBar from '../../components/Critical/SideProgressBar'
import { buildResults } from '../../components/DynamicForm/MyResult'
import { jsPDF } from 'jspdf'
import { GetStaticProps } from 'next'
import csvToQuestionArray from '../../constants/csv_parser'
import { FormAnswerDB } from '../api/form/save'
import _ from 'lodash'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { QuestionType } from '../../models/question'
import {
  BottomButtonBar,
  ButtonContainer,
  BackButton,
  NextEndButton,
  HorizontalBox,
} from '../../components/FormStyles/ExtraStyles'
import { LoadingSpinner } from '../../components/LoadingSpinner'

const Main = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: stretch;
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
  const file = files.actualForm
  const { questions, startingQuestion } = csvToQuestionArray(file)

  return {
    props: {
      questions: questions,
      startingQuestionIndex: startingQuestion,
    },
  }
}

let startingAnswer: FormAnswer

const DynamicForm: React.FC<{
  questions: Question[]
  startingQuestionIndex: number
}> = ({ questions, startingQuestionIndex }) => {
  const startingQuestion: Question = questions[startingQuestionIndex]
  const router = useRouter()
  const [formValues, setFormValues] = useState<FormValues>(emptyFormValues)
  const [currentQuestion, setCurrentQuestion] = useState({
    ...startingQuestion,
  })
  const [currentAnswer, setCurrentAnswer] = useState(startingAnswer)
  const [questionHistory, setQuestionHistory] = useState([startingQuestion])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const { data, status } = useSession()

  if (status === 'unauthenticated') {
    router.push('/signup')
  }

  // For saving values to the database
  useEffect(() => {
    const save = async () => {
      if (!data?.user?.id) {
        return
      }
      const userID = data.user.id
      const body: Omit<FormAnswerDB, '_id'> = {
        userID: userID,
        formValues: formValues,
        questionHistory: questionHistory,
        currentIndex: currentIndex,
        currentQuestion: currentQuestion,
        currentAnswer: currentAnswer,
      }
      const result = await fetch('/api/form/save', {
        method: 'POST',
        body: JSON.stringify(body),
      })
      const resBody = await result.json()
      if (result.status !== 200) {
        console.error(resBody.error)
      }
    }
    if (loaded) {
      save()
    }
  }, [currentIndex])

  //For retrieving values from the database(only runs once)
  useEffect(() => {
    const retrieve = async () => {
      if (!data?.user?.id) {
        return
      }
      const userID = data.user.id
      const result = await fetch(`/api/form/retrieve?userID=${userID}`)
      const body = await result.json()
      if (result.status !== 200) {
        console.error(body.error)
      } else {
        const typedBody = body as FormAnswerDB
        setQuestionHistory(typedBody.questionHistory)
        setFormValues(typedBody.formValues)
        setCurrentQuestion(typedBody.currentQuestion)
        setCurrentAnswer(typedBody.currentAnswer)
        setCurrentIndex(typedBody.currentIndex)
      }
      setLoaded(true)
    }
    if (!loaded) {
      retrieve()
    }
  }, [data])

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
  function _handleQuestionChange(
    nextQuestion: Question,
    newFormValues?: FormValues
  ) {
    if (newFormValues) {
      setFormValues({
        formAnswers: {
          ...newFormValues.formAnswers,
          [currentQuestion.id]: currentAnswer,
        },
      })
    } else {
      setFormValues({
        formAnswers: {
          ...formValues.formAnswers,
          [currentQuestion.id]: currentAnswer,
        },
      })
    }

    setCurrentQuestion(nextQuestion)
    if (formValues.formAnswers[nextQuestion.id]) {
      setCurrentAnswer(formValues.formAnswers[nextQuestion.id])
    } else {
      switch (nextQuestion.type) {
        case QuestionType.CONTINUE:
          setCurrentAnswer({
            questionId: nextQuestion.id,
            type: QuestionType.CONTINUE,
          })
          break
        case QuestionType.RADIO:
          setCurrentAnswer({
            questionId: nextQuestion.id,
            type: QuestionType.RADIO,
            answerId: -1,
          })
          break
        case QuestionType.TEXT:
          setCurrentAnswer({
            questionId: nextQuestion.id,
            type: QuestionType.TEXT,
            userAnswer: '',
          })
          break
      }
    }
  }

  /**
   * handles getting the next question based on current question's answer
   */
  function _handleNext() {
    // if the question is not answered, don't let the user continue
    if (
      !currentAnswer ||
      currentAnswer.questionId !== currentQuestion.id ||
      (currentAnswer.type === QuestionType.RADIO &&
        currentAnswer.answerId === -1)
    ) {
      return
    }
    if (formValues.formAnswers.hasOwnProperty(currentQuestion.id)) {
      _handleQuestionExists()
    } else {
      const nextQuestion = getNextQuestion(currentQuestion, currentAnswer)
      _handleQuestionChange(nextQuestion)
      setQuestionHistory([...questionHistory, nextQuestion])
    }
    setCurrentIndex(currentIndex + 1)
  }

  /**
   * Modifies question history and routes form depending on whether answer has been changed
   */
  function _handleQuestionExists() {
    const nextQuestion = getNextQuestion(currentQuestion, currentAnswer)
    const oldAnswer = formValues.formAnswers[currentQuestion.id]
    let newFormValues = { ...formValues }
    // if the exisitng question is a radio, and they're not the same answer
    if (
      oldAnswer.type === QuestionType.RADIO &&
      currentAnswer.type === QuestionType.RADIO &&
      oldAnswer.answerId !== currentAnswer.answerId
    ) {
      for (let i = currentIndex + 1; i < questionHistory.length; i++) {
        newFormValues = {
          formAnswers: _.omit(newFormValues.formAnswers, questionHistory[i].id),
        }
      }
      setFormValues(newFormValues)
      const questionSlice = questionHistory.slice(0, currentIndex + 1)
      setQuestionHistory([...questionSlice, nextQuestion])
    }
    _handleQuestionChange(nextQuestion, newFormValues)
  }

  function _handleBack() {
    // TODO: in redesign, if we disable the back button on the first question, we can get rid of this check
    if (currentIndex !== 0) {
      const prevQuestion = questionHistory[currentIndex - 1]
      if (
        currentQuestion.type !== QuestionType.RESULT &&
        currentQuestion.id === currentAnswer?.questionId
      ) {
        setFormValues({
          formAnswers: {
            ...formValues.formAnswers,
            [currentQuestion.id]: currentAnswer,
          },
        })
      }
      setCurrentQuestion(prevQuestion)
      setCurrentAnswer(formValues.formAnswers[prevQuestion.id])
      setCurrentIndex(currentIndex - 1)
    }
  }

  function _buildDoc(doc: jsPDF, answers: FormResult[]): jsPDF {
    const x = 10
    let y = 10
    const y_inc = 8

    answers.forEach(function (item) {
      const splitQuestion = doc.splitTextToSize(item.question, 200)
      for (let i = 0; i < splitQuestion.length; i++) {
        doc.setFont('times', 'bold').text(splitQuestion[i], x, y)
        y += y_inc
      }
      if (item.answer != null) {
        doc.setFont('times', 'normal').text('\t' + item.answer + '\n\n', x, y)
        y += y_inc
      }
      if (item.formAnswer.type === QuestionType.TEXT) {
        const splitAnswer = doc.splitTextToSize(item.formAnswer.userAnswer, 200)
        for (let i = 0; i < splitAnswer.length; i++) {
          doc.setFont('times', 'normal').text('\t' + splitAnswer[i], x, y)
          y += y_inc
        }
        doc.text('\n', x, y)
        y += y_inc
      }
    })
    return doc
  }

  function _handleSubmit() {
    // This is where whatever we do at the end of the form (storing, making pdf, etc) would happen

    let doc = new jsPDF()
    const results = buildResults(formValues, questions)
    if (results.length > 0) {
      doc = _buildDoc(doc, results)
      doc.save('PRS_Complaint.pdf')
    }
  }

  return (
    <Main>
      <NavBar />
      <HorizontalBox>
        <SideProgressBar />

        <FormCtx.Provider value={{ formValues, setFormValues }}>
          <Formik
            initialValues={formValues}
            onSubmit={(values: FormValues, { setSubmitting }) => {
              if (currentQuestion.type === QuestionType.RESULT) {
                _handleSubmit()
                setSubmitting(false)
              } else {
                _handleNext()
              }
            }}
          >
            <FormStyled>
              <FormContentWrapper>
                {!loaded ? (
                  <LoadingSpinner />
                ) : (
                  <QuestionDisplayWrapper>
                    <TitleText>{currentQuestion.section}</TitleText>
                    <ChooseFormType
                      question={currentQuestion}
                      onChange={setCurrentAnswer}
                      answer={formValues.formAnswers[currentQuestion.id]}
                      questionHistory={questionHistory}
                    />
                  </QuestionDisplayWrapper>
                )}
                <BottomButtonBar>
                  <ButtonContainer>
                    <BackButton type="button" onClick={() => _handleBack()}>
                      Back
                    </BackButton>
                    <NextEndButton type="submit" disabled={!loaded}>
                      {currentQuestion.type === QuestionType.RESULT
                        ? 'End'
                        : 'Next'}
                    </NextEndButton>
                  </ButtonContainer>
                </BottomButtonBar>
              </FormContentWrapper>
            </FormStyled>
          </Formik>
        </FormCtx.Provider>
      </HorizontalBox>
    </Main>
  )
}

export default DynamicForm
