import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./app/App.tsx"
import { Provider as ReduxProvider } from "react-redux"
import { store } from "./config/store.ts"
import { CssBaseline } from "@mui/material"
import ThemeProvider from "./config/ThemeProvider.tsx"
import GlobalStyle from "./config/GlobalStyle.tsx"
import { LocalizationProvider } from "@mui/x-date-pickers"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs"
import { beginSaveLoad } from "./config/saveload.ts"
import { beginBackupSystem } from "./config/backupSystem.ts"
import { ErrorBoundary } from "react-error-boundary"
import ErrorFallback from "./config/ErrorFallback.tsx"

beginSaveLoad()
beginBackupSystem(1000 * 60 * 20) // backup every 20 minutes

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <ThemeProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <CssBaseline />
          <GlobalStyle />
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <App />
          </ErrorBoundary>
        </LocalizationProvider>
      </ThemeProvider>
    </ReduxProvider>
  </StrictMode>
)
