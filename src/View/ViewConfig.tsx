import { useActiveView } from "./View"
import { useAppDispatch } from "../config/store"
import {
  setFilter,
  setSort,
  setGroup,
  setDepth,
} from "../Portfolio/portfolioSlice"
import { useActivePortfolio } from "../Portfolio/Portfolio"
import { Box, Chip, Slider } from "@mui/material"
import getMaxDepth from "../Portfolio/getMaxDepth"
import AddViewConfigButton from "./Edit/AddViewConfigButton"

export default function ViewConfig() {
  const canConfig = useActivePortfolio((p) => p.fieldGuids.length > 0)
  return (
    <Box display="flex" alignItems="center" gap={2} padding={2}>
      <DepthView />
      <SortView />
      <GroupView />
      <FilterView />
      <Box flexGrow={1} />
      {canConfig && <AddViewConfigButton />}
    </Box>
  )
}

function FilterView() {
  const dispatch = useAppDispatch()
  const filter = useActiveView((v) => v.filter)
  const fieldsByGuid = useActivePortfolio((p) => p.fieldsByGuid)

  if (filter === undefined) return null

  const filterField = fieldsByGuid[filter.fieldGuid].name

  const label = `${filterField} == ${filter.value}`

  return <Chip label={label} onDelete={() => dispatch(setFilter())} />
}

function SortView() {
  const dispatch = useAppDispatch()
  const sort = useActiveView((v) => v.sort)
  const fieldsByGuid = useActivePortfolio((p) => p.fieldsByGuid)

  if (sort === undefined) return null

  const sortField = fieldsByGuid[sort.fieldGuid].name

  const label = `Sort: ${sortField} ${sort.ascending ? "↑" : "↓"}`

  return (
    <Chip
      label={label}
      onDelete={() => dispatch(setSort())}
      onClick={() => {
        dispatch(setSort({ ...sort, ascending: !sort.ascending }))
      }}
    />
  )
}

function GroupView() {
  const dispatch = useAppDispatch()
  const group = useActiveView((v) => v.group)
  const fieldsByGuid = useActivePortfolio((p) => p.fieldsByGuid)

  if (group === undefined) return null

  const groupField = fieldsByGuid[group.fieldGuid].name

  const label = `Group: ${groupField}`

  return <Chip label={label} onDelete={() => dispatch(setGroup())} />
}

function DepthView() {
  const maxDepth = useActivePortfolio((p) => getMaxDepth(p))
  const dispatch = useAppDispatch()
  const depth = useActiveView((v) => v.depth)

  if (maxDepth < 2) {
    return null
  }

  return (
    <Box width={30 * (maxDepth - 1)} marginX={2}>
      <Slider
        value={depth}
        onChange={(_, newValue) => {
          if (!Array.isArray(newValue)) {
            dispatch(setDepth(newValue))
          }
        }}
        // valueLabelDisplay="auto"
        min={1}
        max={maxDepth}
        step={1}
        marks
      />
    </Box>
  )
}
