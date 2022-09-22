import { Question } from '../../models'
import React, { useState, useEffect, useMemo } from 'react'
import {
  emptyFormValues,
  FormAnswer,
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
import { TitleText } from '../../components/FormStyles/QuestionText'
import { AdditionalInfoDb } from '../api/form/additionalinfo/save'
import { ConcernDB } from '../api/form/concern/save'
import { DistrictDB } from '../api/form/district/save'
import { GroupDB } from '../api/form/group/save'
import { studentSpecialCircumstances } from '../../constants/additionalConstants'
import { ContactInfoDb } from '../api/form/contactinfo/save'

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
    if (questionHistory.length === 1) {
      router.push('/form/concern')
    }
    questionHistory.splice(-1)
    _handleQuestionChange()
  }

  // determines whether the given doc needs a new page added to it
  // y denotes where the cursor is placed on the doc in terms of height / the 'y' axis
  // since jsPDF is a little bitch (but better than others)
  const checkNewPage = (y: number, doc: jsPDF) => {
    if (y > 270) {
      doc.addPage()
      return 25
    }
    return y
  }

  // writes on given jsPDF and returns new height (y)
  const writeDocAbstraction = (
    x: number,
    y: number,
    text: string,
    doc: jsPDF,
    fontStyle?: string
  ) => {
    if (fontStyle) {
      doc.setFont('times', fontStyle).text(text, x, y)
    } else {
      doc.text(text, x, y)
    }
    return y + 8
  }

  /**
   * helper method to fetch and write all of the pre-form questions onto the given doc
   * TODO needs contact info endpoint, try to clean up as well
   * @param doc the jsPDF doc to write on
   */
  async function initialInformation(doc: jsPDF) {
    let y = 35
    const userID = data!.user!.id
    // gonna be real this also looks ugly afffff but it all looked ugly aff
    const districtSchool = (await (
      await fetch(`/api/form/district/retrieve?userID=${userID}`)
    ).json()) as DistrictDB
    const contactInfo = (await (
      await fetch(`/api/form/contactinfo/retrieve?userID=${userID}`)
    ).json()) as ContactInfoDb
    const additionalInfo = (await (
      await fetch(`/api/form/additionalinfo/retrieve?userID=${userID}`)
    ).json()) as AdditionalInfoDb
    const concerns = (await (
      await fetch(`/api/form/concern/retrieve?userID=${userID}`)
    ).json()) as ConcernDB
    const groups = (await (
      await fetch(`/api/form/group/retrieve?userID=${userID}`)
    ).json()) as GroupDB

    if (
      districtSchool.status !== 200 ||
      contactInfo.status !== 200 ||
      additionalInfo.status !== 200 ||
      concerns.status !== 200 ||
      groups.status !== 200
    ) {
      // note: this leads to a less helpful error message, as we cannot tell which call failed
      console.error("Failed to obtain information needed for student's details")
    } else {
      y = writeDocAbstraction(
        10,
        y,
        'First Name: ' + contactInfo.firstName,
        doc,
        'normal'
      )
      y = writeDocAbstraction(10, y, 'Last Name: ' + contactInfo.lastName, doc)
      y = writeDocAbstraction(10, y, 'Email: ' + contactInfo.email, doc)
      y = writeDocAbstraction(10, y, 'Phone: ' + contactInfo.phoneNum, doc)
      y = writeDocAbstraction(10, y, 'Address: ' + contactInfo.address, doc)
      y = writeDocAbstraction(10, y, 'City: ' + contactInfo.city, doc)
      y = writeDocAbstraction(10, y, 'State: ' + contactInfo.state, doc)
      y = writeDocAbstraction(10, y, 'Zip Code: ' + contactInfo.zip, doc)

      y = writeDocAbstraction(
        10,
        y,
        'District: ' + districtSchool.district,
        doc,
        'normal'
      )
      y = writeDocAbstraction(10, y, 'School: ' + districtSchool.school, doc)

      y = writeDocAbstraction(
        10,
        y,
        'Primary language: ' + additionalInfo.language,
        doc
      )
      y = writeDocAbstraction(
        10,
        y,
        'Relationship to student: ' + additionalInfo.relationship,
        doc
      )
      y = writeDocAbstraction(10, y, 'DESE Accomodations: ', doc)
      const deseSplit = doc.splitTextToSize(
        additionalInfo.deseAccommodations,
        180
      )
      for (let i = 0; i < deseSplit.length; i++) {
        y = checkNewPage(y, doc)
        y = writeDocAbstraction(10, y, '\t' + deseSplit[i], doc)
      }
      y = writeDocAbstraction(
        10,
        y,
        'BSEA Addressed? ' + additionalInfo.bsea,
        doc
      )

      y = checkNewPage(y, doc)
      y = writeDocAbstraction(10, y, 'Statement of concerns: ', doc, 'bold')
      const concernsSplit = doc.splitTextToSize(concerns.concern, 180)
      for (let j = 0; j < concernsSplit.length; j++) {
        y = checkNewPage(y, doc)
        y = writeDocAbstraction(10, y, '\t' + concernsSplit[j], doc, 'normal')
      }

      const groupsBody = groups as GroupDB
      y = checkNewPage(y, doc)
      y = writeDocAbstraction(10, y, 'Special Circumstances: ', doc)
      for (let k = 0; k < groupsBody.specialCircumstances.length; k++) {
        y = checkNewPage(y, doc)
        if (groupsBody.specialCircumstances[k]) {
          y = writeDocAbstraction(10, y, studentSpecialCircumstances[k], doc)
        }
      }
    }
  }

  async function _buildDoc(doc: jsPDF, answers: FormResult[]): Promise<jsPDF> {
    const x = 10
    let y = 25
    const y_inc = 8

    doc
      .setFont('times', 'bold')
      .text(
        'Student Complaint and Details',
        doc.internal.pageSize.width / 2,
        25,
        { align: 'center' }
      )
    await initialInformation(doc)
    doc.addPage()

    doc
      .setFont('times', 'bold')
      .text('Begin Complaints', doc.internal.pageSize.width / 2, 25, {
        align: 'center',
      })
    y += y_inc

    answers.forEach(function (item) {
      const splitQuestion = doc.splitTextToSize(item.question, 180)
      for (let i = 0; i < splitQuestion.length; i++) {
        y = checkNewPage(y, doc)
        y = writeDocAbstraction(x, y, splitQuestion[i], doc, 'bold')
      }

      if (item.formAnswer.type === QuestionType.TEXT) {
        const splitAnswer = doc.splitTextToSize(item.formAnswer.userAnswer, 180)
        for (let i = 0; i < splitAnswer.length; i++) {
          y = checkNewPage(y, doc)
          y = writeDocAbstraction(x, y, '\t' + splitAnswer[i], doc, 'normal')
        }
        y = writeDocAbstraction(x, y, '\n', doc)
      }
    })
    return doc
  }

  async function _handleSubmit() {
    // This is where whatever we do at the end of the form (storing, making pdf, etc) would happen

    const doc = new jsPDF()
    const results = buildResults(formValues, questionHistory)
    if (results.length > 0) {
      _buildDoc(doc, results)
        .then((doc) => {
          doc.save('PRS_Complaint.pdf')
          router.push('/complete')
        })
        .catch((err) => {
          alert('An error occurred while generating the PDF. Please try again.')
        })
    }
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
    <FormTemplate
      loaded={loaded}
      onBack={_handleBack}
      onSubmit={onSubmit}
      nextButtonText={
        currentQuestion.type === QuestionType.RESULT ? 'End' : 'Next'
      }
      initialValues={formValues}
    >
      <>
        <TitleText>{currentQuestion.section}</TitleText>
        <ChooseFormType
          question={currentQuestion}
          onChange={setCurrentAnswer}
          answer={formValues.formAnswers[currentQuestion.id]}
          questionHistory={questionHistory}
        />
      </>
    </FormTemplate>
  )
}

export default DynamicForm
