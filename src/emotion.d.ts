import '@emotion/react'
import { Theme as CustomTheme } from './theme'

// This declaration allows the emotion's props.theme to be typed
declare module '@emotion/react' {
  export interface Theme extends CustomTheme { }
}
