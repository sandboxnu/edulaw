import { Question } from "./models";

interface MyTextInputProps {
    question: Question
}

export const MyTextInput: React.FC<MyTextInputProps> = ({...props}): JSX.Element => {
    return (
        <div>{props.question.question}</div>
    );
}
