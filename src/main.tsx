import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./app/App.tsx"
import ThemeProvider from "./app/ThemeProvider.tsx"
import GlobalStyle from "./app/GlobalStyle.tsx"
import { Provider as ReduxProvider } from "react-redux"
import { store } from "./app/store.ts"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReduxProvider store={store}>
      <ThemeProvider>
        <GlobalStyle />
        <App />
      </ThemeProvider>
    </ReduxProvider>
  </StrictMode>
)
