import { Question } from '../models'

interface MyResultProps {
  question: Question
}

export const MyResult: React.FC<MyResultProps> = ({
  ...props
}): JSX.Element => {
  return <div>{props.question.question}</div>
}
