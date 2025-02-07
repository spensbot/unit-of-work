import { Box } from "@mui/material"
import ActiveUnitView from "../Unit/ActiveUnitView"
import ViewSelect from "../View/ViewSelect"
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
      <ViewSelect />
      <Box display="flex" flexGrow={1}>
        <ActiveViewView />
        <ActiveUnitView />
      </Box>
    </Root>
  )
}

const Root = styled.div`
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  /* gap: ${({ theme }) => theme.spacing(1)}; */
  /* padding: ${({ theme }) => theme.spacing(2)}; */
`
