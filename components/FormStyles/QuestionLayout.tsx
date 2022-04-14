import styled from 'styled-components'
import { QuestionText } from './QuestionText'
import Tooltip from '../DynamicForm/Tooltip'

interface QuestionProps {
  questionText: string
  input: JSX.Element
  tooltip?: { tooltipText: string; tooltipHoveredText: string }
  results?: JSX.Element[]
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
const QuestionLayout: React.FC<QuestionProps> = ({
  questionText,
  tooltip,
  results,
  input,
}) => {
  return (
    <QuestionDiv>
      {results}
      {<QuestionText>{questionText}</QuestionText>}
      {<Tooltip tooltip={tooltip} />}
      <InputDiv>{input}</InputDiv>
    </QuestionDiv>
  )
}

export default QuestionLayout
