import React, { useContext } from 'react'
import * as Yup from 'yup'
import { MyTextInput } from '../components/MyInput'
import { MySelect } from '../components/MySelect'
import { MyCheckbox } from '../components/MyCheckbox'
import { useRouter } from 'next/router'
import { FormCtx, FormValues } from '../utils/FormContext'
import { Form, Formik } from 'formik'

const FormikExample: React.FC = () => {
  const initValues: FormValues = {
    email: '',
    firstName: '',
    lastName: '',
    acceptedTerms: false,
    jobType: '',
  }
  const router = useRouter()
  const { updateFormValues } = useContext(FormCtx)

  const jobTypeOptions: string[] = [
    'Designer',
    'Developer',
    'Product Manager',
    'Other',
  ]

  return (
    <Formik
      initialValues={initValues}
      validationSchema={Yup.object({
        firstName: Yup.string()
          .max(15, 'Must be 15 characters or less')
          .required('Required'),
        lastName: Yup.string()
          .max(20, 'Must be 20 characters or less')
          .required('Required'),
        email: Yup.string().email('Invalid email address').required('Required'),
        acceptedTerms: Yup.boolean()
          .required('Required')
          .oneOf([true], 'You must accept the terms and conditions.'),
        jobType: Yup.string()
          .oneOf(jobTypeOptions, 'Invalid Job Type')
          .required('Required'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        if (updateFormValues) {
          updateFormValues(values)
        }

        router.push({ pathname: '/results' })
        setSubmitting(false)
      }}
    >
      <Form>
        <MyTextInput
          label="First Name"
          name="firstName"
          type="text"
          placeholder="Your"
        />

        <MyTextInput
          label="Last Name"
          name="lastName"
          type="text"
          placeholder="Mom"
        />

        <MyTextInput
          label="Email Address"
          name="email"
          type="email"
          placeholder="your@mother.com"
        />

        <MySelect label="Job Type" name="jobType" values={jobTypeOptions} />

        <MyCheckbox name="acceptedTerms">
          I accept the terms and conditions
        </MyCheckbox>

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  )
}

export default FormikExample
