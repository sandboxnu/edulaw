import React, { ChangeEvent } from "react";
import { MyTextInput } from "../../../Components/MyInput";
import { Question, Answer, AnswersKeys, answers } from "../models";
import { MyRadio } from './MyRadio';
import { MyResult } from './MyResult';

interface ChooseFormTypeProps {
    question: Question,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const ChooseFormType: React.FC<ChooseFormTypeProps> = ({ ...props }): JSX.Element => {
    let answerChoices: Answer[] = props.question.answers.map(function (answerId: number, i: number) {
        const typedAnswerId = answerId.toString() as AnswersKeys;
        return answers[typedAnswerId] as Answer;
    })

    switch (props.question.type) {
        case 'RADIO': {
            return <MyRadio
                name={props.question.id.toString()}
                label={props.question.question}
                options={answerChoices}
                onChange={props.onChange}
            />
        }
        case 'RESULT': {
            return <MyResult
                question={props.question}
            />
        }
        // TODO: Other form types in general
        default: {
            return <div></div>
        }
    }
}