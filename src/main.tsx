import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.tsx"
import ThemeProvider from "./ThemeProvider.tsx"
import GlobalStyle from "./GlobalStyle.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </StrictMode>
)
