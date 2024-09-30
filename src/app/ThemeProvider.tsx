import { ThemeProvider as EmotionThemeProvider } from "@emotion/react"
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles"
import { createTheme } from "./Theme"

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const theme = createTheme()
  return (
    <EmotionThemeProvider theme={theme}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </EmotionThemeProvider>
  )
}
