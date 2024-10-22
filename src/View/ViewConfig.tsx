import styled from "@emotion/styled"
import { useActiveView } from "./View"
import { useAppDispatch } from "../config/store"
import {
  setFilter,
  setSort,
  setGroup,
  setDepth,
  deleteView,
} from "../Portfolio/portfolioSlice"
import Select from "../components/Select"
import { useActivePortfolio } from "../Portfolio/Portfolio"
import { Box, Button, Slider, TextField } from "@mui/material"
import getMaxDepth from "../Portfolio/getMaxDepth"

export default function ViewConfig({ guid }: { guid: string }) {
  const dispatch = useAppDispatch()
  return (
    <Root>
      <DepthView />
      <SortView />
      <GroupView />
      <FilterView />
      <Button onClick={() => dispatch(deleteView({ guid }))}>Delete</Button>
    </Root>
  )
}

const Root = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(2)};
`

function FilterView() {
  const dispatch = useAppDispatch()
  const filter = useActiveView((v) => v.filter)

  const onChange = (newVal: string) => {
    dispatch(setFilter({ expression: newVal }))
  }

  return (
    <TextField
      size="small"
      label="Filter"
      value={filter?.expression ?? ""}
      onChange={(e) => onChange(e.target.value)}
      fullWidth
    />
  )
}

function SortView() {
  const dispatch = useAppDispatch()
  const sort = useActiveView((v) => v.sort)
  const fields = useActivePortfolio((p) => p.fieldGuids)
  const fieldsByGuid = useActivePortfolio((p) => p.fieldsByGuid)

  return (
    <SubRoot>
      <Select
        value={sort?.fieldGuid}
        onChange={(newFieldGuid) =>
          dispatch(
            setSort(
              newFieldGuid
                ? { fieldGuid: newFieldGuid, ascending: true }
                : undefined
            )
          )
        }
        variants={fields}
        displays={fields.map((guid) => fieldsByGuid[guid].name ?? "")}
        label="Sort"
      />
    </SubRoot>
  )
}

function GroupView() {
  const dispatch = useAppDispatch()
  const group = useActiveView((v) => v.group)
  const fields = useActivePortfolio((p) => p.fieldGuids)
  const fieldsByGuid = useActivePortfolio((p) => p.fieldsByGuid)

  return (
    <SubRoot>
      <Select
        value={group?.fieldGuid}
        onChange={(newFieldGuid) =>
          dispatch(
            setGroup(
              newFieldGuid
                ? { by: "field", fieldGuid: newFieldGuid }
                : undefined
            )
          )
        }
        variants={fields}
        displays={fields.map((guid) => fieldsByGuid[guid].name ?? "")}
        label="Group"
      />
    </SubRoot>
  )
}

function DepthView() {
  const maxDepth = useActivePortfolio((p) => getMaxDepth(p))
  const dispatch = useAppDispatch()
  const depth = useActiveView((v) => v.depth)

  if (maxDepth < 2) {
    return null
  }

  return (
    <SubRoot>
      <Box width={30 * (maxDepth - 1)} marginX={2}>
        <Slider
          value={depth}
          onChange={(_, newValue) => {
            if (!Array.isArray(newValue)) {
              dispatch(setDepth(newValue))
            }
          }}
          valueLabelDisplay="auto"
          min={1}
          max={maxDepth}
          step={1}
          marks
        />
      </Box>
    </SubRoot>
  )
}

const SubRoot = styled.div`
  /* width: ${({ theme }) => theme.spacing(15)}; */
  /* min-width: ${({ theme }) => theme.spacing(15)}; */
`
