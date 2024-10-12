import styled from "@emotion/styled"
import PortfolioView from "../Portfolio/PortfolioView"
import Footer from "./Footer"
import Header from "./Header"
import ErrorTrigger from "../config/ErrorTrigger"

export default function App() {
  return (
    <Root>
      <Header />
      <PortfolioView />
      <Footer />
    </Root>
  )
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`
