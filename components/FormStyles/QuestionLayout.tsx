import styled from 'styled-components'

interface QuestionProps {
  questionText: JSX.Element
  input: JSX.Element
}

const QuestionDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
  gap: 40px;
`

const InputDiv = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: row;
`

// how to attach this to formik? hopefully input will already be attached...
const QuestionLayout: React.FC<QuestionProps> = ({ questionText, input }) => {
  return (
    <QuestionDiv>
      {questionText}
      <InputDiv>{input}</InputDiv>
    </QuestionDiv>
  )
}

export default QuestionLayout
