import { Question, Answer } from '../models'
import fs from 'fs'
import path from 'path'
import { parse } from 'csv-parse/sync'

// The type containing columns that we care about in the Flowchart CSV
type CsvType = {
  Id: string
  Name: string
  'Line Source': string
  'Line Destination': string
  'Text Area 1': string
  'Contained By': string
}

// Extracts the columns of note from the csv
const csvToCsvTypeArray = (fileName: string): CsvType[] => {
  const f = fs.readFileSync(path.resolve(__dirname, fileName))
  const csv = parse(f, { columns: true }) as CsvType[]
  return csv
}

// takes in a list of answers (not including tooltips) and outputs a map from the question id to that answer
const mapAnswers = (answersArray: CsvType[]): Map<number, CsvType[]> => {
  const map = new Map<number, CsvType[]>()
  answersArray.forEach((answer: CsvType) => {
    const existingAnswers = map.get(parseInt(answer['Line Source']))
    if (existingAnswers) {
      existingAnswers.push(answer)
    } else {
      map.set(parseInt(answer['Line Source']), [answer])
    }
  })
  return map
}

// Transforms a csv entry into an Answer
const answerFromCsvType = (answer: CsvType): Answer => {
  if (
    answer['Text Area 1'] === 'CONTINUE' ||
    answer['Text Area 1'] === 'TEXT'
  ) {
    return {
      route: parseInt(answer['Line Destination']),
    }
  } else {
    return {
      content: answer['Text Area 1'],
      route: parseInt(answer['Line Destination']),
    }
  }
}

// converts tooltip entries into a map from question id to the entries corresponding to the tooltips
const generateTooltips = (
  processArray: CsvType[],
  tooltipsArray: CsvType[]
): Map<number, CsvType[]> => {
  const map = new Map<number, CsvType[]>()
  tooltipsArray.forEach((tooltip: CsvType) => {
    const correspondingProcess = processArray.find(
      (entry: CsvType) => entry.Id === tooltip['Line Destination']
    )
    if (!correspondingProcess) {
      console.error('Could not find tooltip details')
      return
    }
    const existingProcess = map.get(parseInt(tooltip['Line Source']))
    if (existingProcess) {
      existingProcess.push(correspondingProcess)
    } else {
      map.set(parseInt(tooltip['Line Source']), [correspondingProcess])
    }
  })
  return map
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
      (process: CsvType) => process.Id === arrow['Line Destination']
    )
    if (!destination) return // This should not occur (only happens if tooltip arrow doesn't point to an actual box)
    tooltipProcesses.add(destination.Id)
    const mapToUse =
      arrow['Text Area 1'] === 'TOOLTIP-TEXT'
        ? tooltipTextMap
        : tooltipHoverTextMap
    mapToUse.set(parseInt(arrow['Line Source']), destination['Text Area 1'])
  })
  return {
    tooltipTextMap: tooltipTextMap,
    tooltipHoverTextMap: tooltipHoverTextMap,
  }
}

// Reads from the provided file into an array of type Question, including parsing answers and tooltips
const csvToQuestionArray = (fileName: string): Question[] => {
  const csv: CsvType[] = csvToCsvTypeArray(fileName)

  const sections = csv.filter(
    (entry: CsvType) => entry.Name === 'Rectangle Container'
  )

  // processArray contains questions and tooltips
  const processArray = csv.filter((entry: CsvType) => entry.Name === 'Process')
  const answersArray = csv.filter(
    (entry: CsvType) =>
      entry.Name === 'Line' && !entry['Text Area 1'].startsWith('TOOLTIP')
  )
  const tooltipArrowsArray = csv.filter(
    (entry: CsvType) =>
      entry.Name === 'Line' && entry['Text Area 1'].startsWith('TOOLTIP')
  )

  const answersMap = mapAnswers(answersArray)
  const tooltipProcesses = new Set<string>()
  const { tooltipTextMap, tooltipHoverTextMap } = mapTooltips(
    processArray,
    tooltipArrowsArray,
    tooltipProcesses
  )

  const questionsArray = processArray.filter(
    (process: CsvType) => !tooltipProcesses.has(process.Id)
  )
  const idMap = new Map<number, number>()

  // this converts each question and answer into their accurate types, but has the inaccurate IDs
  // this also maps the old ids to the new ids, but does not change any IDs
  const wrongIDQuestions = questionsArray.map(
    (question: CsvType, index: number): Question => {
      const id = parseInt(question.Id)
      idMap.set(id, index)
      const answers = answersMap.get(id) || []
      // determine the question type based on the answers
      const type =
        answers.length === 0
          ? 'RESULT'
          : answers.length > 1
          ? 'RADIO'
          : answers[0]['Text Area 1']
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
      const regexedQuestion = question['Text Area 1'].replace(
        /(\s{2,})|(\r?\n)|(\r)|(\u2028)/g,
        '\n'
      )
      // convert answers from csv to answer
      const typedAnswers = answers.map(answerFromCsvType)
      // find section or default to PRS Complaint
      const section =
        sections.find(
          (section: CsvType) => section.Id === question['Contained By']
        )?.['Text Area 1'] || 'PRS Complaint'
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

  return rightIDQuestions
}

export default csvToQuestionArray
