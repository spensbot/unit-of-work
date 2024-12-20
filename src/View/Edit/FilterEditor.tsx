import Select from "../../components/Select"
import { Filter } from "../View"
import { Portfolio, useActivePortfolio } from "../../Portfolio/Portfolio"
import { SelectField } from "../../Field/Field"
import { createSelector } from "@reduxjs/toolkit"

interface Props {
  filter: Filter
  setFilter: (filter: Filter) => void
}

export default function FilterEditor({ filter, setFilter }: Props) {
  const fieldGuids = useActivePortfolio((p) => p.fieldGuids)
  const fieldsByGuid = useActivePortfolio((p) => p.fieldsByGuid)
  const fields = fieldGuids
    .map((guid) => fieldsByGuid[guid])
    .filter((f) => f.t === "SelectField")
  const rootUnits = useActivePortfolio(selectRootUnits)

  const isRootUnit = filter.fieldGuid === "ROOT_UNIT"

  const variants = fields.map((f) => f.guid)
  variants.push("ROOT_UNIT")
  const displays = fields.map((f) => f.name)
  displays.push("Root Unit")

  const valueOptions = isRootUnit
    ? rootUnits.map((u) => u.guid)
    : (fieldsByGuid[filter.fieldGuid] as SelectField).selectOptions

  const valueDisplays = isRootUnit ? rootUnits.map((u) => u.name) : valueOptions

  const setValue = (value?: string) => {
    if (!value) return
    setFilter({ fieldGuid: filter.fieldGuid, value })
  }

  const setFieldGuid = (guid?: string) => {
    if (!guid) return
    setFilter({ fieldGuid: guid, value: filter.value })
  }

  return (
    <>
      <Select
        value={filter.fieldGuid}
        onChange={setFieldGuid}
        variants={variants}
        displays={displays}
      />
      {valueOptions && (
        <Select
          value={filter?.value}
          onChange={setValue}
          variants={valueOptions}
          displays={valueDisplays}
        />
      )}
    </>
  )
}

// To prevent re-renders (even though it doesn't really matter in this case)
// and to prevent a redux warning. We need to use createSelector to memoize our selector for a given set of inputs
const selectRootUnits = createSelector(
  [(p: Portfolio) => p.rootUnitGuids, (p: Portfolio) => p.unitsByGuid],
  (rootUnitGuids, unitsByGuid) => rootUnitGuids.map((guid) => unitsByGuid[guid])
)
