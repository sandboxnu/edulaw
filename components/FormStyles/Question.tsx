import styled from 'styled-components'

interface QuestionProps {
  questionText: JSX.Element
  input: JSX.Element
}

const QuestionDiv = styled.div`
  display: flex;
  flex-direction: column;
`

// how to attach this to formik? hopefully input will already be attached...
const SubMenuItem: React.FC<QuestionProps> = ({ questionText, input }) => {
  return (
    <QuestionDiv>
      {questionText}
      {input}
    </QuestionDiv>
  )
}

export default SubMenuItem
