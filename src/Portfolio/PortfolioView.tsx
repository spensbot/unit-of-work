import ActiveViewView from "../View/ActiveViewView"
import styled from "@emotion/styled"
import DisplayInput from "../components/DisplayInput"
import { setName, setDescription } from "./portfolioSlice"
import { useActivePortfolio } from "./Portfolio"
import { useAppDispatch } from "../main/store"

export default function PortfolioView() {
  const name = useActivePortfolio((portfolio) => portfolio.name)
  const description = useActivePortfolio((portfolio) => portfolio.description)
  const dispatch = useAppDispatch()

  return (
    <Root>
      <DisplayInput
        variant="h4"
        value={name}
        onChange={(name) => dispatch(setName(name))}
      />
      <DisplayInput
        variant="h6"
        value={description}
        onChange={(description) => dispatch(setDescription(description))}
      />
      <ActiveViewView />
    </Root>
  )
}

const Root = styled.div`
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
  padding: ${({ theme }) => theme.spacing(2)};
`
