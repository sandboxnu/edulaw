import {
  Question,
  QuestionsKeys,
  answers,
  AnswersKeys,
  forms,
  Answer,
} from '../../models'
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
import { GetStaticProps } from 'next'
import { parse } from 'csv-parse/sync'
import fs from 'fs'
import path from 'path'

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

const csvToQuestionArray = (csv: CsvType[]): Question[] => {
  const questionsArray = csv.filter(
    (entry: CsvType) => entry.Name === 'Process'
  )
  const answersArray = csv.filter((entry: CsvType) => entry.Name === 'Line')
  const finalQuestions = questionsArray.map(
    (question: CsvType, index: number) => {
      const relevantAnswers = answersArray.filter(
        (answer: CsvType) => answer['Line Source'] === question.Id
      )
      let questionType = 'RESULT'
      const relevantAnswersObjects = relevantAnswers.map(
        (answer: CsvType): Answer => {
          questionType = 'RADIO'
          if (
            answer['Text Area 1'] === 'CONTINUE' ||
            answer['Text Area 1'] === 'TEXT'
          ) {
            questionType = 'TEXT' //answer[rowTitles.indexOf('Text Area 1')]; - for when we add in continue type
          }
          return {
            ...(questionType === 'RADIO'
              ? {
                  content: answer['Text Area 1'],
                }
              : {}),
            route: parseInt(answer['Line Destination']),
          }
        }
      )
      relevantAnswersObjects.sort((a, b) =>
        (a.content || '') < (b.content || '') ? -1 : 1
      )
      return {
        id: parseInt(question.Id),
        question: question['Text Area 1'].replace(
          /(\s{2,})|(\r?\n)|(\r)|(\u2028)/g,
          '\n'
        ),
        type: questionType,
        answers: relevantAnswersObjects,
        section:
          csv.find(
            (element: CsvType) => element.Id === question['Contained By']
          )?.['Text Area 1'] || 'PRS Complaint',
      }
    }
  )
  return finalQuestions
}

const files = {
  animalForm: '../../../constants/Animal Form.csv',
  actualForm: '../../../constants/EdLaw Combined Flowchart.csv',
}

type CsvType = {
  Id: string
  Name: string
  'Line Source': string
  'Line Destination': string
  'Text Area 1': string
  'Contained By': string
}

export const getStaticProps: GetStaticProps = (context) => {
  const file = files.animalForm

  const f = fs.readFileSync(path.resolve(__dirname, file))
  const questionsFromF = csvToQuestionArray(parse(f, { columns: true }))
  const idMap = new Map<number, number>()
  questionsFromF.forEach((question: Question, index: number) => {
    idMap.set(question.id, index)
  })
  const questions = questionsFromF.map((question: Question) => {
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
    console.log('you got here')
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
          <TitleText>{currentQuestion.section}</TitleText>
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
