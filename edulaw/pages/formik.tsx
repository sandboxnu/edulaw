import React from "react";
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { MyTextInput } from '../Components/MyInput';
import { MySelect } from '../Components/MySelect';
import { MyCheckbox } from '../Components/MyCheckbox';

interface FormValues {
  email: string;
  firstName: string;
  lastName: string;
  acceptedTerms: boolean;
  jobType: string
}

const FormikExample: React.FC = () => {
  const initValues: FormValues = {email: '', firstName: '', lastName: '', acceptedTerms: false, jobType:''};
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
        jobType: Yup.string().oneOf(
          ['designer', 'development', 'product', 'other'],
          'Invalid Job Type'
        ).required('Required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
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

        <MySelect label="Job Type" name="jobType">
          <option value="">Select a job type</option>
          <option value="designer">Designer</option>
          <option value="development">Developer</option>
          <option value="product">Product Manager</option>
          <option value="other">Other</option>
        </MySelect>

        <MyCheckbox name="acceptedTerms">
          I accept the terms and conditions
        </MyCheckbox>

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
};

export default FormikExample;
