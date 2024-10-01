import { useActivePortfolio } from "../Portfolio/Portfolio"
import styled from "@emotion/styled"
import UnitView from "../Unit/UnitView"
import Button from "@mui/material/Button"
import { useAppDispatch } from "../app/store"
import { addUnit } from "../Portfolio/portfolioSlice"
import Box from "@mui/material/Box"

export default function ViewView() {
  const viewUnits = useActivePortfolio((portfolio) => portfolio.viewUnits)
  const dispatch = useAppDispatch()

  return (
    <Root>
      <Box height={(theme) => theme.spacing(2)} />
      {viewUnits.map((guid) => (
        <UnitView guid={guid} />
      ))}
      <Box height={(theme) => theme.spacing(2)} />
      <Button variant="contained" onClick={() => dispatch(addUnit())}>
        Add Unit of Work
      </Button>
    </Root>
  )
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
`
