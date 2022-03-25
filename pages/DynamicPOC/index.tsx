import {
  Question,
  QuestionsKeys,
  answers,
  AnswersKeys,
  forms,
  Answer,
} from '../../models'
import { Form, Formik } from 'formik'
import React, { ChangeEvent, useContext, useEffect, useState } from 'react'
import { FormAnswer, FormCtx, FormValues } from '../../utils/FormContext'
import { ChooseFormType } from '../../components/DynamicForm/ChooseFormType'
import { Button } from '../../components/FormStyles/Button'
import NavBar from '../../components/Critical/NavBar'
import styled from 'styled-components'
import SideProgressBar from '../../components/Critical/SideProgressBar'
import { buildResults } from '../../components/DynamicForm/MyResult'
import { jsPDF } from 'jspdf'
import { GetStaticProps } from 'next'
import { parse } from 'csv-parse/sync'
import fs from 'fs'
import path from 'path'
import { questions } from '../../constants'

let startingAnswer: FormAnswer

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

const csvToQuestionArray = (csv: string[][]): Question[] => {
  const rowTitles = csv[0]
  const questionsArray = csv.filter(
    (entry: string[]) => entry[rowTitles.indexOf('Name')] === 'Process'
  )
  const answersArray = csv.filter(
    (entry: string[]) => entry[rowTitles.indexOf('Name')] === 'Line'
  )
  return questionsArray.map((question: string[], index: number) => {
    const relevantAnswers = answersArray.filter(
      (answer: string[]) =>
        answer[rowTitles.indexOf('Line Source')] === question[0]
    )
    const relevantAnswersObjects = relevantAnswers.map((answer: string[]) => {
      return {
        ...(answer[rowTitles.indexOf('Text Area 1')] !== ''
          ? {
              content: answer[rowTitles.indexOf('Text Area 1')],
            }
          : {}),
        route: parseInt(answer[rowTitles.indexOf('Line Destination')]),
      }
    })
    relevantAnswersObjects.sort((a, b) =>
      (a.content || '') < (b.content || '') ? -1 : 1
    )
    const startingQuestion = relevantAnswersObjects.findIndex((answer) => {
      const uppercase = answer.content?.toUpperCase()
      return (
        uppercase === 'DISCIPLINE' ||
        uppercase === 'BULLYING' ||
        uppercase === 'SPECIAL EDUCATION'
      )
    })
    return {
      id: startingQuestion === -1 ? parseInt(question[0]) : -1,
      question: question[rowTitles.indexOf('Text Area 1')],
      type:
        relevantAnswersObjects.length === 0
          ? 'RESULT'
          : relevantAnswersObjects.length === 1
          ? 'TEXT'
          : 'RADIO',
      answers: relevantAnswersObjects,
    }
  })
}

const files = [
  '../../../constants/Bullying.csv',
  '../../../constants/Discipline.csv',
]

export const getStaticProps: GetStaticProps = (context) => {
  const questions: Question[] = [
    {
      id: 0,
      question:
        'Are you having problems with bullying, discipline, or special education?',
      type: 'RADIO',
      answers: [],
    },
  ]

  files.forEach((file: string) => {
    const f = fs.readFileSync(path.resolve(__dirname, file))
    const questionsFromF = csvToQuestionArray(parse(f) as string[][])
    const idMap = new Map<number, number>()
    questionsFromF.forEach((question: Question, index: number) => {
      idMap.set(question.id, questions.length + index)
    })
    const updatedQuestionIds = questionsFromF.map((question: Question) => {
      if (question.id === -1) {
        const a = question.answers[0]
        const newRoute = idMap.get(a.route)
        questions[0].answers.push({
          ...a,
          route: newRoute === undefined ? -1 : newRoute,
        })
      }
      const newQuestionId = idMap.get(question.id)
      return {
        ...question,
        id: newQuestionId === undefined ? -1 : newQuestionId,
        answers: [
          ...question.answers.map((answer: Answer) => {
            const newRoute = idMap.get(answer.route)
            return {
              ...answer,
              route: newRoute === undefined ? -1 : newRoute,
            }
          }),
        ],
      }
    })
    questions.push(...updatedQuestionIds)
  })

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
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    isUserInput: boolean
  ) {
    const answer = {
      questionId: event.target.name,
      answerId: isUserInput ? '0' : event.target.value,
      userAnswer: isUserInput ? event.target.value : undefined,
    }

    setCurrentAnswer(answer)
  }

  /**
   * handles getting the next question based on current question's answer
   */
  function _handleNext() {
    if (
      !currentAnswer ||
      currentAnswer.questionId !== currentQuestion.id.toString()
    ) {
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
    // if (formValues.formAnswers.hasOwnProperty(currentQuestion.id)) {
    setCurrentIndex(currentIndex + 1)
    // }
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
      formValues.formAnswers[currentQuestion.id] = currentAnswer
      setQuestionHistory([...questionSlice, nextQuestion])
    }
    setCurrentQuestion(nextQuestion)
    if (formValues.formAnswers[nextQuestion.id]) {
      setCurrentAnswer(formValues.formAnswers[nextQuestion.id])
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
      console.log('results', results)
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
        <VerticalBox>
          <TitleText>Pet Lover Section</TitleText>
          <div>
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
              <Form>
                <ChooseFormType
                  question={currentQuestion}
                  onChange={_updateCurrentAnswer}
                  answers={formValues.formAnswers[currentQuestion.id]}
                  questions={questions}
                />
                <Button type="button" onClick={() => _handleBack()}>
                  {' '}
                  {'Back'}
                </Button>
                <Button primary type="submit">
                  {currentQuestion.type === 'RESULT' ? 'End' : 'Next'}
                </Button>
              </Form>
            </Formik>{' '}
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
