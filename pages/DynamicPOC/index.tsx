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
      answerId: isUserInput
        ? _getInputAnswerId(event.target.name)
        : event.target.value,
      userAnswer: isUserInput ? event.target.value : undefined,
    }

    setCurrentAnswer(answer)
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
      setCurrentQuestion(getNextQuestion(currentAnswer.answerId as AnswersKeys))
    }
    formValues.formAnswers[currentAnswer.questionId] = currentAnswer
    if (formValues.formAnswers.hasOwnProperty(currentQuestion.id)) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  /**
   * Modifies question history and routes form depending on whether answer has been changed
   */
  function _handleQuestionExists() {
    if (
      formValues.formAnswers[currentAnswer.questionId]['answerId'] !=
      currentAnswer['answerId']
    ) {
      for (let i = currentIndex + 1; i < questionHistory.length; i++) {
        delete formValues.formAnswers[questionHistory[i].id]
      }
      const questionSlice = questionHistory.slice(0, currentIndex + 1)
      setQuestionHistory([...questionSlice, currentQuestion])
      setCurrentQuestion(getNextQuestion(currentAnswer.answerId as AnswersKeys))
    } else {
      if (formValues.formAnswers[currentQuestion.id]) {
        setCurrentQuestion(
          getNextQuestion(
            formValues.formAnswers[currentQuestion.id].answerId as AnswersKeys
          )
        )
      }
    }
  }

  function _handleBack() {
    if (currentIndex != 0) {
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
        <button type="button" onClick={() => _handleBack()}>
          {' '}
          {'Back'}
        </button>
        <button type="submit">
          {currentQuestion.type === 'RESULT' ? 'End' : 'Next'}
        </button>
      </Form>
    </Formik>
  )
}

export default DynamicPOC
