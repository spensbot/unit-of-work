import '@emotion/react'
import { Theme as ThemeType } from './app/Theme'

declare module '@emotion/react' {
  export interface Theme extends ThemeType { }
}