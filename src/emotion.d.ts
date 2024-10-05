import '@emotion/react'
import { Theme as ThemeType } from './config/Theme'

declare module '@emotion/react' {
  export interface Theme extends ThemeType { }
}