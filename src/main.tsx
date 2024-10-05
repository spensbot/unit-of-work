import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./app/App.tsx"
import { Provider as ReduxProvider } from "react-redux"
import { store } from "./main/store.ts"
import { CssBaseline } from "@mui/material"
import ThemeProvider from "./main/ThemeProvider.tsx"
import GlobalStyle from "./main/GlobalStyle.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <ThemeProvider>
        <CssBaseline />
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </ReduxProvider>
  </StrictMode>
)
