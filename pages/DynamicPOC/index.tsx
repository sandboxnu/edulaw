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

  function _handleSubmit(values: FormValues) {
    // This is where whatever we do at the end of the form (storing, making pdf, etc) would happen
    alert(JSON.stringify(values))
    if (updateFormValues) {
      updateFormValues(values)
    }
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
        <button type="submit">
          {currentQuestion.type === 'RESULT' ? 'End' : 'Next'}
        </button>
      </Form>
    </Formik>
  )
}

export default DynamicPOC
