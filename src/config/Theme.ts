import { createTheme as muiCreateTheme, Theme as muiTheme } from "@mui/material/styles"

type Theme = muiTheme

export type ThemeVariant = 'dark' | 'light'

export function createTheme(variant: ThemeVariant): Theme {
  switch (variant) {
    case 'dark':
      return createThemeDark()
    case 'light':
      return createThemeLight()
  }
}

function createThemeLight(): Theme {
  return muiCreateTheme()
}

function createThemeDark(): Theme {
  return muiCreateTheme({
    palette: {
      mode: 'dark',
      background: {
        paper: '#222'
      }
    },
  })
}