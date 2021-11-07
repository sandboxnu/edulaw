import animalForm from './formStore/animalForm.json';
import questions from './formStore/questions.json';
import answers from './formStore/answers.json'; // TODO: Export these in directory

import { Form, Formik } from 'formik';
import { MyRadio } from './MyRadio';
import React, { ChangeEvent, useContext, useState } from 'react';
import { FormAnswer, FormCtx, FormValues, SelectedAnswer } from './FormContext';

export interface Answer {
    id: number,
    type: string,
    content: string,
    route: number
}

type Answers = typeof answers;
type AnswersKeys = keyof Answers;
const typedAnswers = answers as Answers;

type Questions = typeof questions;
export type QuestionsKeys = keyof Questions;
const typedQuestions = questions as Questions; // TODO: Do we use this / need it?


interface Question {
    id: number;
    question: string,
    description: string,
    type: string,
    answers: number[]
}

const firstQuestionId: QuestionsKeys = animalForm.formStartingPoint.toString() as QuestionsKeys;
let startingQuestion: Question = typedQuestions[firstQuestionId] as Question;
let startingAnswer: FormAnswer;

interface ChooseFormTypeProps {
    question: Question,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const ChooseFormType: React.FC<ChooseFormTypeProps> = ({ ...props }): JSX.Element => {
    let answers: Answer[] = props.question.answers.map(function (answerId: number, i: number) {
        const typedAnswerId = answerId.toString() as AnswersKeys;
        return typedAnswers[typedAnswerId] as Answer;
    })

    console.log('CHOOSING FORM TIME');

    switch (props.question.type) {
        case 'RADIO': {
            return <MyRadio
                name={props.question.id.toString()}
                label={props.question.question}
                options={answers}
                onChange={props.onChange}
            />
        }
        case 'RESULT': {
            return <MyResult
                question={props.question}
            />
        }
        case 'TEXT': {
            return <MyResult
                question={props.question}
            />
        }
        // TODO: To finish POC, finish implementing MyResult to handle that kind of answer?
        // TODO: Other form types in general
        default: {
            return <div></div>
        }
    }
}

interface MyResultProps {
    question: Question
}

const MyResult: React.FC<MyResultProps> = ({ ...props }): JSX.Element => {
    return (
        <div>{props.question.question}</div>
    );
}

const MyTextInput: React.FC<MyResultProps> = ({...props}): JSX.Element => {
    return (
        <div>{props.question.question}</div>
    );
}

function getNextQuestion(answerId: AnswersKeys): Question {
    let id: QuestionsKeys = typedAnswers[answerId].route.toString() as QuestionsKeys;
    return questions[id] as Question;
}


const DynamicPOC: React.FC = () => {
    const { formValues, updateFormValues } = useContext(FormCtx);
    let providerValue = {
        formValues: {} as FormValues,
        updateFormValues: _updateForm
    }
    const [currentQuestion, setCurrentQuestion] = useState(startingQuestion);
    const [currentAnswer, setCurrentAnswer] = useState(startingAnswer);

    function _updateForm(answer: FormAnswer, formValues: FormValues) {
        formValues.formAnswers[answer.answer.questionId] = answer;
    }

    function _updateCurrentAnswer(event: ChangeEvent<HTMLInputElement>) {
        let answer = {
            answer: {
                questionId: event.target.name,
                answerId: event.target.value
            }
        };

        setCurrentAnswer(answer);
        console.log(currentAnswer);
    }



    function _handleSubmit(values: FormValues) {
        // TODO: probably do something here, should probably break out into a handleNext and handleSubmit to handle the end of the form
        console.log(values);
        values.formAnswers[currentAnswer.answer.questionId] = currentAnswer;
        setCurrentQuestion(getNextQuestion(currentAnswer.answer.answerId as AnswersKeys));
        console.log(currentQuestion);
    }

    return (
        <FormCtx.Provider value={providerValue}>
            <Formik
                initialValues={{ formAnswers: {} } as FormValues}
                onSubmit={(values) => { // TODO: Set submitting?
                    if (updateFormValues) {
                        updateFormValues(currentAnswer, values);
                    }
                    _handleSubmit(values);
                }}
            >
                <Form>
                    {/* {_chooseFormType(currentQuestion)} */}
                    <ChooseFormType question={currentQuestion} onChange={_updateCurrentAnswer} />
                    <button type="submit">Submit</button> {/*TODO: Hide this at the end of the form */}
                </Form>
            </Formik>
        </FormCtx.Provider>
    );
}

export default DynamicPOC;