import { Question } from '../models'
import { QuestionType } from '../models/question'
import isWellFormed from '../utils/isWellFormed'
import csvParser from './csv_parser'
import expected from './questions.json'

test('Ensure that the animal flowchart is accurately parsed', async () => {
  const actual = csvParser('./Animal Form.csv').questions
  expect(actual).toStrictEqual(expected)
})

expect.extend({
  toBeWellFormed: isWellFormed,
})

test('Ensure animal flowchart is well-formed', async () => {
  const actual = csvParser('./Animal Form.csv').questions
  expect(actual).toBeWellFormed()
})

test('Ensure actual flowchart is well-formed', async () => {
  const actual = csvParser('./EdLaw Combined Flowchart.csv').questions
  expect(actual).toBeWellFormed()
})
