import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React, { useState } from 'react'
import { ThemeProvider } from '@material-ui/core'
import { getLightTheme } from '../styles/themes/index'
import { FormCtx, FormValues, emptyFormValues } from '../utils/FormContext'

function MyApp({ Component, pageProps }: AppProps) {
  const [formValues, setFormValues] = useState<FormValues>(emptyFormValues)

  return (
    <FormCtx.Provider value={{ formValues, updateFormValues: setFormValues }}>
      <ThemeProvider theme={getLightTheme()}>
        <Component {...pageProps} />
      </ThemeProvider>
    </FormCtx.Provider>
  )
}

export default MyApp
