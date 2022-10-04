import { Question, Answer } from '../models'
import fs from 'fs'
import path from 'path'
import { parse } from 'csv-parse/sync'
import { QuestionType } from '../models/question'

// The columns that we care about in the Flowchart CSV
enum CsvColumns {
  ID = 'Id',
  NAME = 'Name',
  SOURCE_ID = 'Line Source',
  DESTINATION_ID = 'Line Destination',
  TEXT = 'Text Area 1',
  CONTAINER_ID = 'Contained By',
}

// This type maps from the column to a string (with the actual contents of that column)
type CsvType = Record<CsvColumns, string>

// Extracts the columns of note from the csv
const csvToCsvTypeArray = async (
  fileName: string | File
): Promise<CsvType[]> => {
  const f =
    typeof fileName === 'string'
      ? fs.readFileSync(path.resolve(__dirname, fileName))
      : await fileName.text()
  const csv = parse(f, { columns: true }) as CsvType[]
  return csv
}

// takes in a list of answers (not including tooltips) and outputs a map from the question id to that answer
const mapAnswers = (answersArray: CsvType[]): Map<number, CsvType[]> => {
  const map = new Map<number, CsvType[]>()
  answersArray.forEach((answer: CsvType) => {
    const existingAnswers = map.get(parseInt(answer[CsvColumns.SOURCE_ID]))
    if (existingAnswers) {
      existingAnswers.push(answer)
    } else {
      map.set(parseInt(answer[CsvColumns.SOURCE_ID]), [answer])
    }
  })
  return map
}

// Transforms a csv entry into an Answer
const answerFromCsvType = (answer: CsvType): Answer => {
  if (['CONTINUE', 'TEXT'].includes(answer[CsvColumns.TEXT])) {
    return {
      route: parseInt(answer[CsvColumns.DESTINATION_ID]),
    }
  } else {
    return {
      content: answer[CsvColumns.TEXT],
      route: parseInt(answer[CsvColumns.DESTINATION_ID]),
    }
  }
}

// converts tooltip array into a more readable form where:
// processArray contains both question and tooltip boxes
// tooltipArrowsArray contains any arrows involved in a tooltip
// tooltipTextMap maps from a question Id to the tooltip text for that question
// tooltipHoverTextMap maps from a question Id to the tooltip hover text for that question
// tooltipProcesses is a set containing all of the ids of tooltip processes
const mapTooltips = (
  processArray: CsvType[],
  tooltipArrowsArray: CsvType[],
  tooltipProcesses: Set<string>
): {
  tooltipTextMap: Map<number, string>
  tooltipHoverTextMap: Map<number, string>
} => {
  const tooltipTextMap = new Map<number, string>()
  const tooltipHoverTextMap = new Map<number, string>()
  tooltipArrowsArray.forEach((arrow: CsvType) => {
    const destination: CsvType | undefined = processArray.find(
      (process: CsvType) =>
        process[CsvColumns.ID] === arrow[CsvColumns.DESTINATION_ID]
    )
    if (!destination) return // This should not occur (only happens if tooltip arrow doesn't point to an actual box)
    tooltipProcesses.add(destination[CsvColumns.ID])
    const mapToUse =
      arrow[CsvColumns.TEXT] === 'TOOLTIP-TEXT'
        ? tooltipTextMap
        : tooltipHoverTextMap
    mapToUse.set(
      parseInt(arrow[CsvColumns.SOURCE_ID]),
      destination[CsvColumns.TEXT]
    )
  })
  return {
    tooltipTextMap: tooltipTextMap,
    tooltipHoverTextMap: tooltipHoverTextMap,
  }
}

// Reads from the provided file into an array of type Question, including parsing answers and tooltips
const csvToQuestionArray = async (fileName: string | File) => {
  const csv: CsvType[] = await csvToCsvTypeArray(fileName)

  const sections = csv.filter(
    (entry: CsvType) => entry[CsvColumns.NAME] === 'Rectangle Container'
  )

  // processArray contains questions and tooltips
  const processArray = csv.filter(
    (entry: CsvType) => entry[CsvColumns.NAME] === 'Process'
  )
  const answersArray = csv.filter(
    (entry: CsvType) =>
      entry[CsvColumns.NAME] === 'Line' &&
      !entry[CsvColumns.TEXT].startsWith('TOOLTIP')
  )
  const tooltipArrowsArray = csv.filter(
    (entry: CsvType) =>
      entry[CsvColumns.NAME] === 'Line' &&
      entry[CsvColumns.TEXT].startsWith('TOOLTIP')
  )

  const answersMap = mapAnswers(answersArray)
  const tooltipProcesses = new Set<string>()
  const { tooltipTextMap, tooltipHoverTextMap } = mapTooltips(
    processArray,
    tooltipArrowsArray,
    tooltipProcesses
  )

  const questionsArray = processArray.filter(
    (process: CsvType) => !tooltipProcesses.has(process[CsvColumns.ID])
  )
  const idMap = new Map<number, number>()

  const startingQuestionID = parseInt(questionsArray[0].Id)

  questionsArray.sort((question1, question2) =>
    question1['Text Area 1'].localeCompare(question2['Text Area 1'])
  )

  // this converts each question and answer into their accurate types, but has the inaccurate IDs
  // this also maps the old ids to the new ids, but does not change any IDs
  const wrongIDQuestions = questionsArray.map(
    (question: CsvType, index: number): Question => {
      const id = parseInt(question[CsvColumns.ID]) // determine the question type based on the answers
      idMap.set(id, index)
      const answers = answersMap.get(id) || []
      // determine the question type based on the answers
      const type: QuestionType =
        answers.length === 0
          ? QuestionType.RESULT
          : answers.length > 1
          ? QuestionType.RADIO
          : answers[0]['Text Area 1'] === 'CONTINUE'
          ? QuestionType.CONTINUE
          : QuestionType.TEXT

      // only add tooltip if text and hoverText are present (undefined causes bugs with getStaticProps)
      let tooltip:
        | { tooltipText: string; tooltipHoveredText: string }
        | undefined = undefined
      const tooltipText = tooltipTextMap.get(id)
      const tooltipHoveredText = tooltipHoverTextMap.get(id)
      if (tooltipText && tooltipHoveredText) {
        tooltip = {
          tooltipText: tooltipText,
          tooltipHoveredText: tooltipHoveredText,
        }
      }
      // eliminate funky newline characters in CSV
      const regexedQuestion = question[CsvColumns.TEXT]
        .replace(/(\s{2,})|(\r?\n)|(\r)|(\u2028)/g, '\n')
        .trim()
      // convert answers from csv to answer
      const typedAnswers = answers.map(answerFromCsvType)
      // find section or default to PRS Complaint
      const section =
        sections.find(
          (section: CsvType) =>
            section[CsvColumns.ID] === question[CsvColumns.CONTAINER_ID]
        )?.[CsvColumns.TEXT] || 'PRS Complaint'
      const typedQuestion: Question = {
        id: id,
        question: regexedQuestion,
        answers: typedAnswers,
        type: type,
        section: section,
      }
      if (tooltip) typedQuestion.tooltip = tooltip
      return typedQuestion
    }
  )

  // this updates the IDs of the answers and questions to point correctly
  const rightIDQuestions = wrongIDQuestions.map(
    (question: Question): Question => {
      // because of the falsy nature of 0, we have to explicitly compare to undefined
      const getId = (id: number): number => {
        const newId = idMap.get(id)
        if (newId === undefined) return -1
        return newId
      }
      // update answer ids
      const newAnswers = question.answers.map(
        (answer: Answer): Answer => ({ ...answer, route: getId(answer.route) })
      )
      // we sort the answers so Yes and No are always on the same sides
      newAnswers.sort((a: Answer, b: Answer) =>
        (a.content || '') < (b.content || '') ? -1 : 1
      )
      // update question id
      const fixedId: Question = {
        ...question,
        id: getId(question.id),
        answers: newAnswers,
      }
      return fixedId
    }
  )

  const startingQuestion = idMap.get(startingQuestionID) ?? 0

  return {
    questions: rightIDQuestions,
    startingQuestion: startingQuestion,
  }
}

export default csvToQuestionArray
