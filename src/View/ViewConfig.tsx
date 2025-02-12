import { useActiveView } from "./View"
import { useAppDispatch } from "../config/store"
import { setSort, setGroup, setDepth } from "../Portfolio/portfolioSlice"
import { useActivePortfolio } from "../Portfolio/Portfolio"
import { Box, Chip, Slider } from "@mui/material"
import getMaxDepth from "../Portfolio/getMaxDepth"
import AddViewConfigButton from "./Edit/AddViewConfigButton"
import HierarchyView from "./HierarchyView"
import FiltersView from "./FiltersView"

export default function ViewConfig() {
  const canConfig = useActivePortfolio((p) => p.fieldGuids.length > 0)
  return (
    <Box display="flex" alignItems="center" gap={2} padding={2}>
      {/* <DepthView /> */}
      <HierarchyView />
      <SortView />
      <GroupView />
      <FiltersView />
      <Box flexGrow={1} />
      {canConfig && <AddViewConfigButton />}
    </Box>
  )
}

function SortView() {
  const dispatch = useAppDispatch()
  const sort = useActiveView((v) => v.sort)
  const fieldsByGuid = useActivePortfolio((p) => p.fieldsByGuid)

  if (sort === undefined) return null

  const sortField = fieldsByGuid[sort.fieldGuid]?.name ?? "Deleted Field"

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

  const groupField = fieldsByGuid[group.fieldGuid]?.name ?? "Deleted Field"

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
