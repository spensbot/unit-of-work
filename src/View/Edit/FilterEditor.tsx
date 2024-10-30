import Select from "../../components/Select"
import { Filter } from "../View"
import { useActivePortfolio } from "../../Portfolio/Portfolio"
import { SelectField } from "../../Field/Field"

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

  const displays = fields.map((f) => f.name)

  const valueOptions =
    filter && (fieldsByGuid[filter.fieldGuid] as SelectField).selectOptions

  const setValue = (value?: string) => {
    if (!filter || !value) return
    setFilter({ fieldGuid: filter.fieldGuid, value })
  }

  const setFieldGuid = (guid?: string) => {
    if (!guid) return
    setFilter({ fieldGuid: guid, value: filter?.value ?? "" })
  }

  return (
    <>
      <Select
        value={filter?.fieldGuid}
        onChange={setFieldGuid}
        variants={fields.map((f) => f.guid)}
        displays={displays}
      />
      {valueOptions && (
        <Select
          value={filter?.value}
          onChange={setValue}
          variants={valueOptions}
        />
      )}
    </>
  )
}
