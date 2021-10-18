import React from 'react';
import { useRouter } from 'next/router';
import { FormValues } from './formik';

const ExampleResults: React.FC = () => {
  const router = useRouter()

  // this line is HELLA crusty but it works :)
  const query: string = Object.keys(router.query)[0]
  let formResults: FormValues = { acceptedTerms: false, email: '', firstName: '', jobType: '', lastName: '' }
  if (query) {
    formResults = JSON.parse(query)
  }

  return (
    <div>
      {`Name: ${formResults.firstName} ${formResults.lastName}`}
    </div>
  )
}

export default ExampleResults;
