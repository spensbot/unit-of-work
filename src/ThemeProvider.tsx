import { ThemeProvider as EmotionThemeProvider } from "@emotion/react"
import { createLight } from "./theme"

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <EmotionThemeProvider theme={createLight()}>
      {children}
    </EmotionThemeProvider>
  )
}
