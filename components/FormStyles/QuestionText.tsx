import styled from 'styled-components'

export const QuestionText = styled.label`
  font-family: Source Sans Pro;
  font-size: 16px;
  line-height: 33px;
`
export const AnswerText = styled.label`
  font-family: Source Sans Pro;
  font-size: 16px;
  line-height: 33px;
  font-weight: 600;
`

const QuoteBlockBar = styled.div`
  width: 5px;
  background: #75ba39;
  border-radius: 5px;
  margin-right: 12px;
`

interface QuestionTextProps {
  questionText: string
}

const BlockQuote: React.FC<QuestionTextProps> = ({ questionText }) => {
  return (
    <div style={{ display: 'flex', padding: '10px, 0px, 10px, 0px' }}>
      <QuoteBlockBar />
      <QuestionText>{questionText}</QuestionText>
    </div>
  )
}

export const QuestionsWithBlockText: React.FC<QuestionTextProps> = ({
  questionText,
}) => {
  return (
    <div>
      {questionText
        .split('"')
        .map((text, i) =>
          i % 2 == 0 ? (
            <QuestionText key={text}>{text}</QuestionText>
          ) : (
            <BlockQuote key={text} questionText={text} />
          )
        )}
    </div>
  )
}
