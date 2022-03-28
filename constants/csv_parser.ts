import { Question, Answer } from '../models'
import fs from 'fs'
import path from 'path'
import { parse } from 'csv-parse/sync'

type CsvType = {
  Id: string
  Name: string
  'Line Source': string
  'Line Destination': string
  'Text Area 1': string
  'Contained By': string
}

const csvToQuestionArray = (fileName: string): Question[] => {
  const f = fs.readFileSync(path.resolve(__dirname, fileName))
  const csv = parse(f, { columns: true }) as CsvType[]
  csv.splice(0, 0, {
    Id: '0',
    Name: 'placeholder',
    'Line Source': '',
    'Line Destination': '',
    'Text Area 1': '',
    'Contained By': '',
  })
  const questionsArray = csv.filter(
    (entry: CsvType) => entry.Name === 'Process'
  )
  const tooltips: number[] = []
  const answersArray = csv.filter((entry: CsvType) => entry.Name === 'Line')
  const questionsWrongIds = questionsArray.map(
    (question: CsvType, index: number): Question => {
      const relevantAnswers = answersArray.filter(
        (answer: CsvType) => answer['Line Source'] === question.Id
      )
      let questionType = 'RESULT'
      const tooltip: { tooltipText?: string; tooltipHoveredText?: string } = {}
      const relevantAnswersObjects: Answer[] = []
      relevantAnswers.forEach((answer: CsvType): Answer | undefined => {
        switch (answer['Text Area 1']) {
          case 'CONTINUE':
          case 'TEXT':
            questionType = answer['Text Area 1']
            break
          case 'TOOLTIP-TEXT':
            const tooltipId = parseInt(answer['Line Destination'])
            tooltips.push(tooltipId)
            tooltip.tooltipText = csv[tooltipId]['Text Area 1']
            return
          case 'TOOLTIP-HOVER-TEXT':
            const tooltipHoverId = parseInt(answer['Line Destination'])
            tooltips.push(tooltipHoverId)
            tooltip.tooltipHoveredText = csv[tooltipHoverId]['Text Area 1']
            return
          default:
            questionType = 'RADIO'
            break
        }
        relevantAnswersObjects.push({
          ...(questionType === 'RADIO'
            ? {
                content: answer['Text Area 1'],
              }
            : {}),
          route: parseInt(answer['Line Destination']),
        })
      })
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
        ...tooltip,
      }
    }
  )
  const filterOutTooltips = questionsWrongIds.filter(
    (question: Question) => !tooltips.includes(question.id)
  )
  const idMap = new Map<number, number>()
  filterOutTooltips.forEach((question: Question, index: number) => {
    idMap.set(question.id, index)
  })
  const questions = filterOutTooltips.map((question: Question) => {
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
  return questions
}

export default csvToQuestionArray
