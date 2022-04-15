import { Question, Answer } from '../../models'
import { Form, Formik } from 'formik'
import React, { useState, useEffect } from 'react'
import {
  emptyFormValues,
  FormAnswer,
  FormCtx,
  FormValues,
} from '../../utils/FormContext'
import { ChooseFormType } from '../../components/DynamicForm/ChooseFormType'
import { Button } from '../../components/FormStyles/Button'
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

const Main = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: stretch;
`

const VerticalBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding-left: 15%;
  justify-content: center;
`
const GreyBar = styled.div`
  width: 30%;
  min-width: 250px;
  max-width: 400px;
  background-color: #e5e5e5;
  height: 100%;
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
  font-size: large;
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

let startingAnswer: FormAnswer

const DynamicPOC: React.FC<{ questions: Question[] }> = ({ questions }) => {
  const startingQuestion: Question = questions[0]

  const [formValues, setFormValues] = useState<FormValues>(emptyFormValues)
  const [currentQuestion, setCurrentQuestion] = useState(startingQuestion)
  const [currentAnswer, setCurrentAnswer] = useState(startingAnswer)
  const [questionHistory, setQuestionHistory] = useState([startingQuestion])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const { data } = useSession()

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
      setFormValues({
        formAnswers: {
          ...formValues.formAnswers,
          [currentQuestion.id]: currentAnswer,
        },
      })
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
      let newFormValues = formValues
      for (let i = currentIndex + 1; i < questionHistory.length; i++) {
        newFormValues = {
          formAnswers: _.omit(
            newFormValues.formAnswers,
            questionHistory[i].id.toString()
          ),
        }
      }
      setFormValues(newFormValues)
      const questionSlice = questionHistory.slice(0, currentIndex + 1)
      const nextQuestion = getNextQuestion(
        questions[currentQuestion.id].answers[parseInt(currentAnswer.answerId)]
      )
      setQuestionHistory([...questionSlice, nextQuestion])
      setFormValues({
        formAnswers: {
          ...formValues.formAnswers,
          [currentQuestion.id]: currentAnswer,
        },
      })
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
        setFormValues({
          formAnswers: {
            ...formValues.formAnswers,
            [currentQuestion.id]: currentAnswer,
          },
        })
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
    setFormValues(values)

    let doc = new jsPDF()
    const results = buildResults(values['formAnswers'], questions)
    doc = _buildDoc(doc, results)
    doc.save('a4.pdf')
  }

  return (
    <Main>
      <NavBar></NavBar>
      <HorizontalBox>
        <VerticalBox>
          <TitleText>{currentQuestion.section}</TitleText>
          <div>
            {!loaded ? null : (
              <FormCtx.Provider value={{ formValues, setFormValues }}>
                <Formik
                  initialValues={formValues}
                  onSubmit={(values: FormValues, { setSubmitting }) => {
                    setFormValues(values)
                    _handleNext()
                    if (currentQuestion.type === 'RESULT') {
                      _handleSubmit(values)
                      setSubmitting(false)
                    }
                  }}
                >
                  <Form>
                    <ChooseFormType
                      question={currentQuestion}
                      onChange={_updateCurrentAnswer}
                      answers={formValues.formAnswers[currentQuestion.id]}
                      questions={questions}
                    />
                    <Button type="button" onClick={() => _handleBack()}>
                      {'Back'}
                    </Button>
                    <Button primary type="submit">
                      {currentQuestion.type === 'RESULT' ? 'End' : 'Next'}
                    </Button>
                  </Form>
                </Formik>{' '}
              </FormCtx.Provider>
            )}
          </div>
        </VerticalBox>
        <GreyBar>
          <SideProgressBar />
        </GreyBar>
      </HorizontalBox>
    </Main>
  )
}

export default DynamicPOC
