import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./app/App.tsx"
import { Provider as ReduxProvider } from "react-redux"
import { store } from "./app/store.ts"
import { CssBaseline } from "@mui/material"
import ThemeProvider from "./app/ThemeProvider.tsx"
import GlobalStyle from "./app/GlobalStyle.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CssBaseline />
    <ReduxProvider store={store}>
      <ThemeProvider>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </ReduxProvider>
  </StrictMode>
)
