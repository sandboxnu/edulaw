import '../styles/globals.css'
import '../styles/formikStyles.css'
import type { AppProps } from 'next/app'
import React, { useState } from 'react';
import { FormCtx, defaultFormState, FormValues, emptyFormValues } from '../utils/FormContext';

function MyApp({ Component, pageProps }: AppProps) {
  const [, setFormValues] = useState<FormValues>(emptyFormValues)
  const updateFormValues = (updatedValues: FormValues) => {
    console.log(updatedValues)
    setFormValues(updatedValues)
  }

  return (
    <FormCtx.Provider
      value={{
        formValues: emptyFormValues,
        updateFormValues
      }}
    >
      <Component {...pageProps} />
    </FormCtx.Provider>
  )
}
export default MyApp
