import {
  Question,
  questions,
  QuestionsKeys,
  answers,
  AnswersKeys,
  forms,
  Answer,
} from '../../models'
import { Form, Formik } from 'formik'
import React, { ChangeEvent, useContext, useState } from 'react'
import { FormAnswer, FormCtx, FormValues } from '../../utils/FormContext'
import { ChooseFormType } from '../../components/DynamicForm/ChooseFormType'
import { Button } from '../../components/FormStyles/Button'
import NavBar from '../../components/Critical/NavBar'
import styled from 'styled-components'
import SideProgressBar from '../../components/Critical/SideProgressBar'
import { buildResults } from '../../components/DynamicForm/MyResult'
import { jsPDF } from 'jspdf'

const firstQuestionId: QuestionsKeys =
  forms.animalForm.toString() as QuestionsKeys
const startingQuestion: Question = questions[firstQuestionId] as Question
let startingAnswer: FormAnswer

function getNextQuestion(answer: Answer): Question {
  const id: number = answer.route
  return questions[id] as Question
}

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

const DynamicPOC: React.FC = () => {
  const { formValues, updateFormValues } = useContext(FormCtx)

  const [currentQuestion, setCurrentQuestion] = useState(startingQuestion)
  const [currentAnswer, setCurrentAnswer] = useState(startingAnswer)
  const [questionHistory, setQuestionHistory] = useState([startingQuestion])
  const [currentIndex, setCurrentIndex] = useState(0)

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
    console.log(formValues)
  }

  function _getInputAnswerId(questionId: string): string {
    const question: Question = questions[
      questionId as QuestionsKeys
    ] as Question
    return question.answers[0].toString() // TODO: Probably error check this or something
  }

  /**
   * handles getting the next question based on current question's answer
   */
  function _handleNext() {
    if (formValues.formAnswers.hasOwnProperty(currentAnswer.questionId)) {
      _handleQuestionExists()
    } else {
      setQuestionHistory((questionHistory) => [
        ...questionHistory,
        currentQuestion,
      ])
    }
    formValues.formAnswers[currentQuestion.id] = currentAnswer
    if (formValues.formAnswers.hasOwnProperty(currentQuestion.id)) {
      setCurrentIndex(currentIndex + 1)
    }
    setCurrentQuestion(
      getNextQuestion(
        questions[parseInt(currentAnswer.questionId)].answers[
          parseInt(currentAnswer.answerId)
        ]
      )
    )
  }

  /**
   * Modifies question history and routes form depending on whether answer has been changed
   */
  function _handleQuestionExists() {
    if (
      formValues.formAnswers[currentQuestion.id]['answerId'] !==
      currentAnswer['answerId']
    ) {
      for (let i = currentIndex + 1; i < questionHistory.length; i++) {
        delete formValues.formAnswers[questionHistory[i].id]
      }
      const questionSlice = questionHistory.slice(0, currentIndex + 1)
      setQuestionHistory([...questionSlice, currentQuestion])
      formValues.formAnswers[currentQuestion.id] = currentAnswer
      setCurrentQuestion(
        getNextQuestion(
          questions[parseInt(currentAnswer.questionId)].answers[
            parseInt(currentAnswer.answerId)
          ]
        )
      )
    } else {
      if (formValues.formAnswers[currentQuestion.id]) {
        setCurrentQuestion(
          getNextQuestion(
            questions[parseInt(currentAnswer.questionId)].answers[
              parseInt(currentAnswer.answerId)
            ]
          )
        )
      }
    }
  }

  function _handleBack() {
    if (currentIndex !== 0) {
      setCurrentIndex(currentIndex - 1)
      const newQuestion = questionHistory[currentIndex]
      setCurrentQuestion(newQuestion)
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
    const results = buildResults(values['formAnswers'])
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
