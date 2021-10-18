import React, { useState } from "react";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { MyTextInput } from '../Components/MyInput';
import { MySelect } from '../Components/MySelect';
import { MyCheckbox } from '../Components/MyCheckbox';
import { useRouter } from 'next/router';

export interface FormValues {
  email: string;
  firstName: string;
  lastName: string;
  acceptedTerms: boolean;
  jobType: string
}

const FormikExample: React.FC = () => {
  const initValues: FormValues = {email: '', firstName: '', lastName: '', acceptedTerms: false, jobType:''};
  const router = useRouter()

  const jobTypeOptions: string[] = ['Designer', 'Developer', 'Product Manager', 'Other']

  return (
    <Formik
      initialValues={initValues}
      validationSchema={Yup.object({
        firstName: Yup.string()
          .max(15, 'Must be 15 characters or less').required('Required'),
        lastName: Yup.string()
          .max(20, 'Must be 20 characters or less').required('Required'),
        email: Yup.string().email('Invalid email address').required('Required'),
        acceptedTerms: Yup.boolean().required('Required')
          .oneOf([true], 'You must accept the terms and conditions.'),
        jobType: Yup.string().oneOf(jobTypeOptions, 'Invalid Job Type').required('Required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        router.push({
          pathname: '/results',
          query: JSON.stringify(values)
        }, 'results')

        setSubmitting(false)
      }}
    >
      <Form>
        <MyTextInput
          label='First Name'
          name='firstName'
          type='text'
          placeholder='Your'
        />

        <MyTextInput
          label='Last Name'
          name='lastName'
          type='text'
          placeholder='Mom'
        />

        <MyTextInput
          label='Email Address'
          name='email'
          type='email'
          placeholder='your@mother.com'
        />

        <MySelect
          label="Job Type"
          name="jobType"
          values={jobTypeOptions}
        />

        <MyCheckbox name="acceptedTerms">
          I accept the terms and conditions
        </MyCheckbox>

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default FormikExample;
