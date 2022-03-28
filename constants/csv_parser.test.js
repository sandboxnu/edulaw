import csvParser from './csv_parser'

const expected = [
  {
    id: 0,
    question: 'Do you like dogs?',
    type: 'RADIO',
    answers: [
      { content: 'No', route: 2 },
      { content: 'Yes', route: 1 },
    ],
    section: 'Pet Lover Section',
  },
  {
    id: 1,
    question: 'Do you have a pet?',
    type: 'RADIO',
    answers: [
      { content: 'No', route: 4 },
      { content: 'Yes', route: 5 },
    ],
    section: 'Pet Lover Section',
    tooltipText: 'Do younger siblings count?',
    tooltipHoveredText: 'No, younger siblings do not count.',
  },
  {
    id: 2,
    question: 'What about cats?',
    type: 'RADIO',
    answers: [
      { content: 'No', route: 6 },
      { content: 'Yes', route: 1 },
    ],
    section: 'Pet Lover Section',
  },
  {
    id: 3,
    question: "Why don't you like dogs or cats?",
    type: 'TEXT',
    answers: [{ route: 4 }],
    section: 'Pet Lover Section',
  },
  {
    id: 4,
    question: 'You are not a fan of animals.',
    type: 'RESULT',
    answers: [],
    section: 'Pet Lover Section',
  },
  {
    id: 5,
    question: 'You are an animal lover!',
    type: 'RESULT',
    answers: [],
    section: 'Pet Lover Section',
  },
  {
    id: 6,
    question: 'You should love animals.',
    type: 'CONTINUE',
    answers: [{ route: 3 }],
    section: 'Pet Lover Section',
  },
]

test('Ensure that the animal flowchart is accurately parsed', async () => {
  const actual = csvParser('./Animal Form.csv')
  expect(actual).toStrictEqual(expected)
})
