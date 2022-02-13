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
  //const [answerHistory, setAnswerHistory] = useState([currentAnswer])
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
    // console.log(currentAnswer)
  }

  function _getInputAnswerId(questionId: string): string {
    const question: Question = questions[
      questionId as QuestionsKeys
    ] as Question
    return question.answers[0].toString() // TODO: Probably error check this or something
  }

  function _handleNext() {
    console.log('HANDLE NEXT')
    if (formValues.formAnswers.hasOwnProperty(currentAnswer.questionId)) {
      console.log(formValues.formAnswers[currentAnswer.questionId])
      if (
        formValues.formAnswers[currentAnswer.questionId]['answerId'] !=
        currentAnswer['answerId']
      ) {
        console.log('DELETING STUFF')
        console.log(currentAnswer)
        for (let i = currentIndex; i < questionHistory.length; i++) {
          delete formValues.formAnswers[questionHistory[i].id]
        }
        const questionSlice = questionHistory.slice(0, currentIndex)
        // todo some index checking
        setQuestionHistory([...questionSlice, currentQuestion])
      } else {
        console.log('NOT CHANGING ANSWER')
        setCurrentIndex(currentIndex + 1)
      }
    } else {
      console.log('UPDATE CURRENT INDEX AND HISTORY')
      setCurrentIndex(currentIndex + 1)
      setQuestionHistory((questionHistory) => [
        ...questionHistory,
        currentQuestion,
      ])
    }
    formValues.formAnswers[currentAnswer.questionId] = currentAnswer
    setCurrentQuestion(getNextQuestion(currentAnswer.answerId as AnswersKeys))
    // formValues.formAnswers[currentAnswer.questionId] = currentAnswer
    // console.log(formValues.formAnswers)
    // setCurrentQuestion(getNextQuestion(currentAnswer.answerId as AnswersKeys))

    // formValues.formAnswers[currentAnswer.questionId] = currentAnswer
    // setCurrentQuestion(getNextQuestion(currentAnswer.answerId as AnswersKeys))
    // if(currentIndex != questionHistory.length - 1) {
    //   // i'm trying to think but my braincells are kinda sus rn?
    // } else {
    //   setQuestionHistory((questionHistory) => [
    //     ...questionHistory,
    //     currentQuestion,
    //   ])
    // }
    // setCurrentIndex(currentIndex + 1)

    // const questionSlice = questionHistory.slice(0, currentIndex)
    // setQuestionHistory([...questionSlice, currentQuestion])
    // setCurrentIndex(currentIndex + 1)
  }

  function _handleBack() {
    console.log('HANDLE BACK')
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
