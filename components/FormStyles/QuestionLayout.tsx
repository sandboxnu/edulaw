import styled from 'styled-components'
import { QuestionsWithBlockText } from './QuestionText'
import Tooltip from '../DynamicForm/Tooltip'

interface QuestionProps {
  input: JSX.Element
  questionText: string
  tooltip?: { tooltipText: string; tooltipHoveredText: string }
  results?: JSX.Element[]
}
const QuestionDiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
  gap: 20px;
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
      <QuestionsWithBlockText questionText={questionText} />
      <Tooltip tooltip={tooltip} />
      <InputDiv>{input}</InputDiv>
    </QuestionDiv>
  )
}

export default QuestionLayout
