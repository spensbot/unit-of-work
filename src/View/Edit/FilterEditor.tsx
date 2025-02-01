import Select from "../../components/Select"
import { SelectFieldFilter } from "../View"
import { useActivePortfolio } from "../../Portfolio/Portfolio"
import { SelectField } from "../../Field/Field"

interface Props {
  filter: SelectFieldFilter
  setFilter: (filter: SelectFieldFilter) => void
}

export default function SelectFieldFilterEditor({ filter, setFilter }: Props) {
  const fieldGuids = useActivePortfolio((p) => p.fieldGuids)
  const fieldsByGuid = useActivePortfolio((p) => p.fieldsByGuid)
  const fields = fieldGuids
    .map((guid) => fieldsByGuid[guid])
    .filter((f) => f?.t === "SelectField")

  const variants = fields.map((f) => f.guid)
  const displays = fields.map((f) => f.name)

  // This cast is safe as long as we never allow the field type to change for a given field guid
  const valueOptions = (fieldsByGuid[filter.fieldGuid] as SelectField)
    .selectOptions

  const valueDisplays = valueOptions

  const setValue = (value?: string) => {
    if (!value) return
    setFilter({
      t: "SelectFieldFilter",
      fieldGuid: filter.fieldGuid,
      values: [value],
    })
  }

  const setFieldGuid = (guid?: string) => {
    if (!guid) return
    setFilter({
      t: "SelectFieldFilter",
      fieldGuid: guid,
      values: [],
    })
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
          value={filter?.values[0]}
          onChange={setValue}
          variants={valueOptions}
          displays={valueDisplays}
        />
      )}
    </>
  )
}
