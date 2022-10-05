import { Question } from '../../models'
import React, { useState, useEffect, useMemo } from 'react'
import {
  emptyFormValues,
  FormAnswer,
  FormCtx,
  FormResult,
  FormValues,
} from '../../utils/FormContext'
import { ChooseFormType } from '../../components/DynamicForm/ChooseFormType'
import { buildResults } from '../../components/DynamicForm/MyResult'
import { jsPDF } from 'jspdf'
import { GetStaticProps } from 'next'
import csvToQuestionArray from '../../constants/csv_parser'
import { FormAnswerDB } from '../api/form/save'
import _ from 'lodash'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { QuestionType } from '../../models/question'
import { FormTemplate } from '../../components/Critical/FormTemplate'
import { dbConnect } from '../../server/_dbConnect'
import { ObjectId } from 'mongodb'

type DynamicFormInput = {
  questions: Question[]
  startingQuestionIndex: number
}

export const getStaticProps: GetStaticProps<DynamicFormInput> = async (
  context
) => {
  const client = await dbConnect()

  if (!client) {
    throw Error('An error occurred while connecting to the database.')
  }

  const formCollection = client.db('edlaw').collection('questions')
  const startingQuestionCollection = client
    .db('edlaw')
    .collection('startingQuestion')

  const questions = (await formCollection.find().toArray()) as unknown as
    | Array<Question & { _id: ObjectId }>
    | undefined
  const questionsNoId = questions?.map((q) => _.omit(q, '_id'))
  const startingQuestion =
    (await startingQuestionCollection.findOne()) as unknown as
      | {
          index: number
        }
      | undefined

  return {
    props: {
      questions: questionsNoId || [],
      startingQuestionIndex: startingQuestion?.index || 0,
    },
  }
}

let startingAnswer: FormAnswer
let questionHistory: Question[] = []

const DynamicForm: React.FC<DynamicFormInput> = ({
  questions,
  startingQuestionIndex,
}) => {
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

  const forceSave = async ({
    formValues,
    questionHistory,
    currentQuestion,
    currentAnswer,
  }: Omit<FormAnswerDB, '_id' | 'userID'>) => {
    if (!data?.user?.id) {
      return
    }
    const body: Omit<FormAnswerDB, '_id'> = {
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
  }

  const save = useMemo(() => {
    return _.debounce(forceSave, 3000)
  }, [])

  // For saving values to the database
  useEffect(() => {
    if (loaded) {
      save({
        formValues: formValues,
        questionHistory: questionHistory,
        currentQuestion: currentQuestion,
        currentAnswer: currentAnswer,
      })
    }
  }, [formValues, currentQuestion, questionHistory, currentAnswer])

  //For retrieving values from the database(only runs once)
  useEffect(() => {
    const retrieve = async () => {
      if (!data?.user?.id) {
        return
      }
      const result = await fetch(`/api/form/retrieve`)
      const body = await result.json()
      if (result.status !== 200) {
        console.error(body.error)
        questionHistory = [startingQuestion]
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
    if (questionHistory.length === 1) {
      const fn = async () => {
        await forceSave({
          formValues: formValues,
          questionHistory: questionHistory,
          currentQuestion: currentQuestion,
          currentAnswer: currentAnswer,
        })
        router.push('/form/concern')
      }
      fn()
    } else {
      questionHistory.splice(-1)
      _handleQuestionChange()
    }
  }

  async function _handleSubmit() {
    // This is where whatever we do at the end of the form (storing, making pdf, etc) would happen

    const results = buildResults(formValues, questions)
    const stringDoc = results.length > 0 ? JSON.stringify(results) : ''
    router.push(
      {
        pathname: '/complete',
        query: { data: stringDoc },
      },
      '/complete  '
    )
  }

  const onSubmit = (
    values: FormValues,
    { setSubmitting }: { setSubmitting: (submit: boolean) => void }
  ) => {
    if (currentQuestion.type === QuestionType.RESULT) {
      _handleSubmit()
      setSubmitting(false)
    } else {
      _handleNext()
    }
  }

  return (
    <FormCtx.Provider value={{ formValues, setFormValues }}>
      <FormTemplate
        title={currentQuestion.section}
        onNavigate={async () => {
          await forceSave({
            formValues: formValues,
            questionHistory: questionHistory,
            currentQuestion: currentQuestion,
            currentAnswer: currentAnswer,
          })
        }}
        loaded={loaded}
        onBack={_handleBack}
        onSubmit={onSubmit}
        nextButtonText={
          currentQuestion.type === QuestionType.RESULT ? 'End' : 'Next'
        }
        initialValues={formValues}
      >
        <ChooseFormType
          question={currentQuestion}
          onChange={setCurrentAnswer}
          answer={formValues.formAnswers[currentQuestion.id]}
          questionHistory={questionHistory}
        />
      </FormTemplate>
    </FormCtx.Provider>
  )
}

export default DynamicForm
