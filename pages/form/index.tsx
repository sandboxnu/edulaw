import { Question } from '../../models'
import { Form, Formik } from 'formik'
import React, { useState, useEffect, useMemo } from 'react'
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
let questionHistory: Question[] = []

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
  const [loaded, setLoaded] = useState(false)
  const { data, status } = useSession()

  if (status === 'unauthenticated') {
    router.push('/signup')
  }

  const save = useMemo(() => {
    return _.debounce(async () => {
      console.log('saving')
      if (!data?.user?.id) {
        return
      }
      const userID = data.user.id
      const body: Omit<FormAnswerDB, '_id'> = {
        userID: userID,
        formValues: formValues,
        questionHistory: questionHistory,
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
    }, 30000)
  }, [])

  // For saving values to the database
  useEffect(() => {
    if (loaded) {
      save()
    }
  }, [currentQuestion])

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
        questionHistory = typedBody.questionHistory
        setFormValues(typedBody.formValues)
        setCurrentQuestion(typedBody.currentQuestion)
        setCurrentAnswer(typedBody.currentAnswer)
      }
      setLoaded(true)
    }
    if (!loaded) {
      retrieve()
    }
  }, [data])

  useEffect(() => {
    questionHistory.push(startingQuestion)
  }, [])

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
  function _handleQuestionChange() {
    const newFormValues: FormValues = {
      formAnswers: {
        ...formValues.formAnswers,
        [currentQuestion.id]: currentAnswer,
      },
    }
    setFormValues(newFormValues)

    const newQuestion = questionHistory[questionHistory.length - 1]
    setCurrentQuestion(newQuestion)
    if (newQuestion.id in newFormValues.formAnswers) {
      setCurrentAnswer(newFormValues.formAnswers[newQuestion.id])
    } else {
      switch (newQuestion.type) {
        case QuestionType.CONTINUE:
          setCurrentAnswer({
            questionId: newQuestion.id,
            type: QuestionType.CONTINUE,
          })
          break
        case QuestionType.RADIO:
          setCurrentAnswer({
            questionId: newQuestion.id,
            type: QuestionType.RADIO,
            answerId: -1,
          })
          break
        case QuestionType.TEXT:
          setCurrentAnswer({
            questionId: newQuestion.id,
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
    const nextQuestion = getNextQuestion(currentQuestion, currentAnswer)
    questionHistory.push(nextQuestion)
    _handleQuestionChange()
  }

  function _handleBack() {
    if (questionHistory.length === 1) return
    questionHistory.splice(-1)
    _handleQuestionChange()
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
    const results = buildResults(formValues, questionHistory)
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
