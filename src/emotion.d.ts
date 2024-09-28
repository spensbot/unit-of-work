import '@emotion/react'
import { Theme as CustomTheme } from './app/Theme'

// This declaration allows emotion's props.theme to be typed
declare module '@emotion/react' {
  export interface Theme extends CustomTheme { }
}
