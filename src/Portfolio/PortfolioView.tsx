import ActiveViewView from "../View/ViewView"
import styled from "@emotion/styled"

export default function PortfolioView() {
  return (
    <Root>
      {/* <DisplayInput
        variant="h4"
        value={name}
        onChange={(name) => dispatch(setName(name))}
      />
      <DisplayInput
        variant="h6"
        value={description}
        onChange={(description) => dispatch(setDescription(description))}
      /> */}
      <ActiveViewView />
    </Root>
  )
}

const Root = styled.div`
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(1)};
  /* padding: ${({ theme }) => theme.spacing(2)}; */
`
