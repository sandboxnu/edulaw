import { createTheme, PaletteType } from '@material-ui/core'

const defaultTheme = createTheme()

export default function getLightTheme() {
  return createTheme({
    palette: {
      type: 'light' as PaletteType,
      primary: {
        light: '#F3F4F6',
        main: '#FFFFFF',
        dark: '#3D3D3D',
      },
      secondary: {
        light: '#F1F1F1',
        main: '#75BA39',
        dark: '#5064C7',
      },
    },
    typography: {
      fontFamily: 'Source Sans Pro',
      h1: {
        fontWeight: 600,
        fontSize: '40px',
      },
      h2: {
        fontWeight: 600,
        fontSize: '34px',
      },
      h4: {
        fontWeight: 600,
        fontSize: '22px',
      },
      h6: {
        fontWeight: 300,
        fontSize: '18px',
      },
      body1: {
        fontWeight: 400,
        fontSize: '26px',
      },
      body2: {
        fontWeight: 400,
        fontSize: '20px',
      },
      caption: {
        fontWeight: 700,
        fontSize: '18px',
      },
      button: {
        fontWeight: 600,
        fontSize: '24px',
      },
    },
  })
}
