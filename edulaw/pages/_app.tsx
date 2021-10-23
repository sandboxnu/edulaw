import '../styles/globals.css'
import '../styles/formikStyles.css'
import type { AppProps } from 'next/app'
import React, { useState } from 'react';
import { FormCtx, FormValues, emptyFormValues } from '../utils/FormContext';

function MyApp({ Component, pageProps }: AppProps) {
  const [formValues, setFormValues] = useState<FormValues>(emptyFormValues)
  const updateFormValues = (updatedValues: FormValues) => {
    setFormValues(updatedValues)
  }

  return (
    <FormCtx.Provider
      value={{
        formValues,
        updateFormValues
      }}
    >
      <Component {...pageProps} />
    </FormCtx.Provider>
  )
}
export default MyApp
