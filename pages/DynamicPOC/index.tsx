import {
  Question,
  questions,
  QuestionsKeys,
  answers,
  AnswersKeys,
  forms,
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

function getNextQuestion(answerId: AnswersKeys): Question {
  const id: QuestionsKeys = answers[answerId].route.toString() as QuestionsKeys
  return questions[id] as Question
}

const Main = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: stretch;
`

const VerticalBox = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 70%;
  margin-top: 3em;
  justify-content: center;
`
const GreyBar = styled.div`
  width: 450px;
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

  function _updateCurrentAnswer(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    isUserInput: boolean
  ) {
    const answer = {
      questionId: event.target.name,
      answerId: isUserInput
        ? _getInputAnswerId(event.target.name)
        : event.target.value,
      userAnswer: isUserInput ? event.target.value : undefined,
    }

    setCurrentAnswer(answer)
    console.log(currentAnswer)
  }

  function _getInputAnswerId(questionId: string): string {
    const question: Question = questions[
      questionId as QuestionsKeys
    ] as Question
    return question.answers[0].toString() // TODO: Probably error check this or something
  }

  function _handleNext() {
    formValues.formAnswers[currentAnswer.questionId] = currentAnswer
    setCurrentQuestion(getNextQuestion(currentAnswer.answerId as AnswersKeys))
  }

  function _buildDoc(doc: jsPDF, answers: FormAnswer[]): jsPDF {
    const results = ''
    const x = 10
    let y = 10
    const y_inc = 8

    answers.forEach(function (item, index) {
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
          <TitleText> This is the Bullying Section?</TitleText>
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
                />
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
