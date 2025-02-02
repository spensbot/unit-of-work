import styled from "@emotion/styled"
import { useActivePortfolio } from "../Portfolio/Portfolio"
import { Box, Button, IconButton, TextField } from "@mui/material"
import {
  setUnitName,
  setUnitDescription,
  setActiveUnit,
  addUnit,
  addUnitRandomized,
  createViewWithFocusUnit,
} from "../Portfolio/portfolioSlice"
import { useAppDispatch } from "../config/store"
import { Close } from "@mui/icons-material"
import UnitViewTr from "./UnitViewTr"
import { newUnit } from "./Unit"
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp"
import { ActiveUnitFieldView } from "../Field/FieldView"
import isDebug from "../isDebug"
import DeleteUnitButton from "./DeleteUnitButton"

export default function ActiveUnitView() {
  const guid = useActivePortfolio((p) => p.activeUnitGuid)
  const dispatch = useAppDispatch()

  if (!guid) return null

  return (
    <Root>
      <Box display="flex" alignItems="center" gap={2}>
        <GotoParentButton guid={guid} />
        <Name guid={guid} />
        <DeleteUnitButton guid={guid} />
        <IconButton onClick={() => dispatch(setActiveUnit({}))}>
          <Close />
        </IconButton>
      </Box>
      <Description guid={guid} />
      {/* <Children guid={guid} /> */}
      <Button
        onClick={() => {
          dispatch(createViewWithFocusUnit(guid))
        }}
      >
        Create View
      </Button>
      <AddChildButton guid={guid} />
      <AddRandomizedChildButton guid={guid} />
    </Root>
  )
}

// Deprecated
// We used to render a separate table of child units in the ActiveUnitView
// This was intended to feel like asana's subtasks editor
// But I think inconsistend behaviour with that of the view would provide more confusion than anything
function Children({ guid }: { guid: string }) {
  const fieldGuids = useActivePortfolio((p) => p.fieldGuids)

  const childrenGuids = useActivePortfolio(
    (p) => p.unitsByGuid[guid].childrenGuids
  )
  return (
    <table>
      <thead>
        <tr>
          <th>Child</th>
          {fieldGuids.map((fieldGuid) => {
            return (
              <th key={fieldGuid}>
                <ActiveUnitFieldView
                  key={fieldGuid}
                  unitGuid={guid}
                  fieldGuid={fieldGuid}
                />
              </th>
            )
          })}
          <th />
        </tr>
      </thead>
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

function GotoParentButton({ guid }: { guid: string }) {
  const dispatch = useAppDispatch()
  const parentGuid = useActivePortfolio((p) => p.unitsByGuid[guid].parentGuid)

  if (!parentGuid) return null

  return (
    <IconButton
      onClick={() => {
        dispatch(setActiveUnit({ guid: parentGuid }))
      }}
    >
      <ArrowCircleUpIcon sx={{ fontSize: 30 }} />
    </IconButton>
  )
}

function AddChildButton({ guid }: { guid: string }) {
  const dispatch = useAppDispatch()

  return (
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
  )
}

function AddRandomizedChildButton({ guid }: { guid: string }) {
  const dispatch = useAppDispatch()

  if (!isDebug) return null

  return (
    <Button
      onClick={() => {
        dispatch(addUnitRandomized({ parentGuid: guid }))
      }}
    >
      🤪 Add Child (Randomized)
    </Button>
  )
}

const Root = styled.div`
  padding: ${({ theme }) => theme.spacing(2)};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(2)};
  flex: 1 1 auto;
`
