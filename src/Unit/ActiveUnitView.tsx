import styled from "@emotion/styled"
import { useActivePortfolio } from "../Portfolio/Portfolio"
import { Box, Button, IconButton, TextField } from "@mui/material"
import {
  setUnitName,
  setUnitDescription,
  moveUnit,
  setActiveUnit,
  deleteUnit,
  addUnit,
} from "../Portfolio/portfolioSlice"
import { useAppDispatch } from "../config/store"
import { Close } from "@mui/icons-material"
import UnitViewTr from "./UnitViewTr"
import { newUnit } from "./Unit"

export default function ActiveUnitView() {
  const guid = useActivePortfolio((p) => p.activeUnitGuid)
  const dispatch = useAppDispatch()

  if (!guid) return null

  return (
    <Root>
      <Box display="flex" alignItems="center" gap={2}>
        <Name guid={guid} />
        <IconButton onClick={() => dispatch(setActiveUnit({}))}>
          <Close />
        </IconButton>
      </Box>
      <Description guid={guid} />
      <Children guid={guid} />
      <Button
        onClick={() =>
          dispatch(
            addUnit({
              unit: newUnit(guid),
            })
          )
        }
      >
        Add Child Unit
      </Button>
    </Root>
  )
}

function Children({ guid }: { guid: string }) {
  const childrenGuids = useActivePortfolio(
    (p) => p.unitsByGuid[guid].childrenGuids
  )
  const dispatch = useAppDispatch()
  return (
    <table>
      <tbody>
        {childrenGuids.map((childGuid) => (
          <UnitViewTr key={childGuid} guid={childGuid} />
        ))}
      </tbody>
    </table>
  )
}

function Name({ guid }: { guid: string }) {
  const name = useActivePortfolio((p) => p.unitsByGuid[guid].name)
  const dispatch = useAppDispatch()
  return (
    <TextField
      value={name}
      onChange={(e) => dispatch(setUnitName({ guid, name: e.target.value }))}
      label="Name"
      fullWidth
    />
  )
}

function Description({ guid }: { guid: string }) {
  const description = useActivePortfolio((p) => p.unitsByGuid[guid].description)
  const dispatch = useAppDispatch()
  return (
    <TextField
      value={description}
      onChange={(e) =>
        dispatch(setUnitDescription({ guid, description: e.target.value }))
      }
      label="Description"
      multiline
      minRows={3}
    />
  )
}

const Root = styled.div`
  padding: ${({ theme }) => theme.spacing(2)};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
  flex: 1 1 auto;
`
