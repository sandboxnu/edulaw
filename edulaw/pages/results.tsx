import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { FormCtx, FormValues } from '../utils/FormContext';

const ExampleResults: React.FC = () => {
  const router = useRouter()

  // this line is HELLA crusty but it works :)
  // const query: string = Object.keys(router.query)[0]
  // let formResults: FormValues = { acceptedTerms: false, email: '', firstName: '', jobType: '', lastName: '' }
  // if (query) {
  //   formResults = JSON.parse(query)
  // }
  const { formValues } = useContext(FormCtx)

  console.log(formValues)

  return (
    <div>
      {`Name: ${formValues.firstName} ${formValues.lastName}`}
    </div>
  )
}

export default ExampleResults;
