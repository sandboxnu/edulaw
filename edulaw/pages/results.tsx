import React from 'react';
import { useRouter } from 'next/router';
import { FormValues } from './formik';

const ExampleResults: React.FC = () => {
  const router = useRouter()

  // this line is HELLA crusty but it works :)
  const formResults: FormValues = JSON.parse(Object.keys(router.query)[0])

  return (
    <div>
      {`Name: ${formResults.firstName} ${formResults.lastName}`}
    </div>
  )
}

export default ExampleResults;
