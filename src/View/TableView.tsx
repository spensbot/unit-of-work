import styled from "@emotion/styled"
import UnitView from "../Unit/UnitView"
import Button from "@mui/material/Button"
import { useAppDispatch } from "../main/store"
import { addUnit } from "../Portfolio/portfolioSlice"
import Box from "@mui/material/Box"
import { newUnit } from "../Unit/Unit"
import { useActivePortfolio } from "../Portfolio/Portfolio"

export default function TableView() {
  const viewUnits = useActivePortfolio((p) => p.activeViewUnitGuids)
  const dispatch = useAppDispatch()

  return (
    <Root>
      <Button
        variant="contained"
        onClick={() => dispatch(addUnit({ unit: newUnit() }))}
        sx={{
          alignSelf: "flex-end",
        }}
      >
        Add Field
      </Button>
      <Box height={(theme) => theme.spacing(2)} />
      {viewUnits.map((guid) => (
        <UnitView guid={guid} />
      ))}
      <Box height={(theme) => theme.spacing(2)} />
      <Button
        variant="contained"
        onClick={() => dispatch(addUnit({ unit: newUnit() }))}
      >
        Add Unit of Work
      </Button>
    </Root>
  )
}

const Root = styled.div``
