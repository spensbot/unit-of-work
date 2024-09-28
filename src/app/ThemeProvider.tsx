import { ThemeProvider as EmotionThemeProvider } from "@emotion/react"
import { createLight } from "./Theme"

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
