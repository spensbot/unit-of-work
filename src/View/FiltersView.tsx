import { indexArray } from "@/util/arrayUtil"
import { SelectFieldFilter, useActiveView } from "./View"
import { useAppDispatch } from "@/config/store"
import { useActivePortfolio } from "@/Portfolio/Portfolio"
import usePopover from "@/hooks/usePopover"
import { Chip } from "@mui/material"
import PopoverBox from "@/components/PopoverBox"
import FilterEditor from "./Edit/FilterEditor"
import {
  modifyFilter,
  removeFilter,
  setViewFocusUnits,
} from "@/Portfolio/portfolioSlice"
import { mapUndef } from "@/util/functional"
import { Log } from "@/util/Log"

export default function FiltersView() {
  const nFilters = useActiveView((v) => v.filters.length)

  return (
    <>
      <FocusUnitsView />
      {indexArray(nFilters).map((i) => (
        <FilterView key={i} i={i} />
      ))}
    </>
  )
}

function FilterView({ i }: { i: number }) {
  Log.Info("FilterView")
  const filter = useActiveView((v) => v.filters[i])

  if (filter === undefined) {
    Log.Error(`filter undefined`)
    return null
  }

  if (filter.t === "SelectFieldFilter")
    return <SelectFieldFilterView i={i} filter={filter} />
}

function FocusUnitsView() {
  const dispatch = useAppDispatch()
  const units = useActiveView((v) => v.focusUnits)
  const unitName = useActivePortfolio((p) =>
    mapUndef(units[0], (id) => p.unitsByGuid[id].name)
  )
  const label = `Unit == ${unitName}`

  if (units.length === 0) return null

  return <Chip label={label} onDelete={() => dispatch(setViewFocusUnits([]))} />
}

function SelectFieldFilterView({
  i,
  filter,
}: {
  i: number
  filter: SelectFieldFilter
}) {
  const dispatch = useAppDispatch()
  const fieldName = useActivePortfolio(
    (p) => p.fieldsByGuid[filter.fieldGuid]?.name
  )
  const [open, Popover] = usePopover()

  const label =
    filter.values.length === 1
      ? `${fieldName} == ${filter.values[0]}`
      : `${fieldName} == (${filter.values.join(" || ")})`

  return (
    <>
      <Chip
        label={label}
        onDelete={() => dispatch(removeFilter(i))}
        onClick={open}
      />
      <Popover>
        <PopoverBox>
          <FilterEditor
            filter={filter}
            setFilter={(newFilter) => {
              dispatch(modifyFilter({ i, filter: newFilter }))
            }}
          />
        </PopoverBox>
      </Popover>
    </>
  )
}
