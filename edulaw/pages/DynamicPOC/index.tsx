import { Question, questions, QuestionsKeys, answers, AnswersKeys, forms } from './models';
import { Form, Formik } from 'formik';
import React, { ChangeEvent, useContext, useState } from 'react';
import { FormAnswer, FormCtx, FormValues } from './FormContext'; // Note use of a different form context than before
import { ChooseFormType } from './components/ChooseFormType';

const firstQuestionId: QuestionsKeys = forms.animalForm.toString() as QuestionsKeys;
let startingQuestion: Question = questions[firstQuestionId] as Question;
let startingAnswer: FormAnswer;

function getNextQuestion(answerId: AnswersKeys): Question {
    let id: QuestionsKeys = answers[answerId].route.toString() as QuestionsKeys;
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

    function _handleNext(values: FormValues) {
        values.formAnswers[currentAnswer.answer.questionId] = currentAnswer;
        setCurrentQuestion(getNextQuestion(currentAnswer.answer.answerId as AnswersKeys));
    }

    function _handleSubmit(values: FormValues) {
        // This is where whatever we do at the end of the form (storing, making pdf, etc) would happen
        alert(JSON.stringify(values));
    }

    return (
        <FormCtx.Provider value={providerValue}>
            <Formik
                initialValues={{ formAnswers: {} } as FormValues}
                onSubmit={(values: FormValues, {setSubmitting}) => {
                    if (updateFormValues) {
                        updateFormValues(currentAnswer, values);
                    }
                    _handleNext(values);
                    if (currentQuestion.type === "RESULT") {
                        _handleSubmit(values);
                        setSubmitting(false);
                    }
                }}
            >
                <Form>
                    <ChooseFormType question={currentQuestion} onChange={_updateCurrentAnswer} />
                    <button type="submit">{currentQuestion.type === "RESULT" ? 'End' : 'Next'}</button>
                </Form>
            </Formik>
        </FormCtx.Provider>
    );
}

export default DynamicPOC;