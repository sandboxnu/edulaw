import '../styles/globals.css'
import type { AppProps } from 'next/app'
import React from 'react'
import { ThemeProvider } from '@material-ui/core'
import { getLightTheme } from '../styles/themes/index'
import { SessionProvider } from 'next-auth/react'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <ThemeProvider theme={getLightTheme()}>
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  )
}

export default MyApp
