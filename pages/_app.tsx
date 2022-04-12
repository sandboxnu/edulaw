import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React from 'react'
import { ThemeProvider } from '@material-ui/core'
import { getLightTheme } from '../styles/themes/index'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={getLightTheme()}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
