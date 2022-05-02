import csvParser from './csv_parser'
import expected from './questions.json'

test('Ensure that the animal flowchart is accurately parsed', async () => {
  const actual = csvParser('./Animal Form.csv')
  expect(actual).toStrictEqual(expected)
})
