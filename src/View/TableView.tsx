import styled from "@emotion/styled"
import UnitViewTr from "../Unit/UnitViewTr"
import Button from "@mui/material/Button"
import { addUnit, setActiveUnit } from "../Portfolio/portfolioSlice"
import { newUnit } from "../Unit/Unit"
import { useActivePortfolio } from "../Portfolio/Portfolio"
import { useAppDispatch } from "../config/store"
import Box from "@mui/material/Box"
import FieldView from "../Field/FieldView"
import AddFieldButton from "../Field/AddFieldButton"

export default function TableView() {
  const fieldGuids = useActivePortfolio((p) => p.fieldGuids)
  const fieldsByGuid = useActivePortfolio((p) => p.fieldsByGuid)
  const viewUnits = useActivePortfolio((p) => p.activeViewUnitGuids)

  return (
    <Root>
      <Table>
        <thead>
          <Tr>
            <Th></Th>
            <Th>Unit</Th>
            {fieldGuids.map((guid) => {
              return (
                <Th key={guid}>
                  <FieldView key={guid} guid={guid} />
                </Th>
              )
            })}
            <Th style={{ textAlign: "right" }}>
              <AddFieldButton />
            </Th>
          </Tr>
        </thead>
        <tbody>
          {viewUnits.map((unitGuid) => {
            return <UnitViewTr key={unitGuid} guid={unitGuid} />
          })}
        </tbody>
        <tfoot />
      </Table>
      <Box height={(theme) => theme.spacing(2)} />
      <AddUnitButton />
    </Root>
  )
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
`

const Table = styled.table`
  border-collapse: collapse;
`

const Tr = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.palette.divider};
`

const Th = styled.th`
  text-align: left;
`

function AddUnitButton() {
  const dispatch = useAppDispatch()

  return (
    <Button
      fullWidth
      onClick={() => {
        const unit = newUnit()
        dispatch(addUnit({ unit }))
        dispatch(setActiveUnit({ guid: unit.guid }))
      }}
      sx={{
        alignSelf: "flex-end",
      }}
    >
      Add Unit
    </Button>
  )
}
