import { Typography } from "@mui/material"
import { useActivePortfolio } from "../Portfolio/Portfolio"
import ActiveView from "../View/ActiveView"
import styled from "@emotion/styled"

export default function PortfolioView() {
  const portfolioName = useActivePortfolio((portfolio) => portfolio.name)
  const portfolioDescription = useActivePortfolio(
    (portfolio) => portfolio.description
  )

  return (
    <Root>
      <Typography variant="h1">{portfolioName}</Typography>
      <Typography>{portfolioDescription}</Typography>
      <ActiveView />
    </Root>
  )
}

const Root = styled.div`
  flex: 1 0 auto;
`
