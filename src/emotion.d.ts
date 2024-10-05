import '@emotion/react'
import { Theme as ThemeType } from './main/Theme'

declare module '@emotion/react' {
  export interface Theme extends ThemeType { }
}