import { Button, IconButton } from "@mui/material"
import Select from "@/components/Select"
import { useState } from "react"
import { useAppDispatch } from "@/config/store"
import { Group, SelectFieldFilter, Sort } from "../View"
import { useActivePortfolio } from "@/Portfolio/Portfolio"
import { addFilter, setGroup, setSort } from "@/Portfolio/portfolioSlice"
import { ArrowUpward, ArrowDownward } from "@mui/icons-material"
import SelectGroup from "@/components/SelectGroup"
import FilterEditor from "./FilterEditor"
import PopoverBox from "@/components/PopoverBox"
import { Log } from "@/util/Log"

type ConfigType = "Sort" | "Group" | "Filter"
const configTypes: readonly ConfigType[] = ["Sort", "Group", "Filter"]

interface Props {
  close: () => void
}

export default function AddViewConfigPopup({ close }: Props) {
  const [configType, setConfigType] = useState<ConfigType>("Sort")

  return (
    <PopoverBox>
      <SelectGroup
        value={configType}
        onChange={(type) => type && setConfigType(type)}
        variants={configTypes}
      />
      {configType === "Sort" && <AddSortView close={close} />}
      {configType === "Group" && <AddGroupView close={close} />}
      {configType === "Filter" && <AddFilterView close={close} />}
    </PopoverBox>
  )
}

function AddSortView({ close }: Props) {
  const fieldGuids = useActivePortfolio((p) => p.fieldGuids)
  const fieldsByGuid = useActivePortfolio((p) => p.fieldsByGuid)
  const fields = fieldGuids
    .map((guid) => fieldsByGuid[guid])
    .filter((f) => f !== undefined)
  const displays = fields.map((f) => f.name)
  const dispatch = useAppDispatch()
  const [sort, setLocalSort] = useState<Sort>({
    fieldGuid: fieldGuids[0],
    ascending: false,
  })

  const setFieldGuid = (fieldGuid: string) =>
    setLocalSort({ ...sort, fieldGuid })

  const setAscending = (ascending: boolean) =>
    setLocalSort({ ...sort, ascending })

  const onAdd = () => {
    if (!sort) return
    dispatch(setSort(sort))
    close()
  }

  return (
    <>
      <Select
        value={sort.fieldGuid}
        onChange={setFieldGuid}
        variants={fieldGuids}
        displays={displays}
      />
      <AscendingButton ascending={sort.ascending} setAscending={setAscending} />
      <Button onClick={onAdd}>Add</Button>
    </>
  )
}

function AscendingButton({
  ascending,
  setAscending,
}: {
  ascending: boolean
  setAscending: (a: boolean) => void
}) {
  return (
    <IconButton onClick={() => setAscending(!ascending)}>
      {ascending ? <ArrowUpward /> : <ArrowDownward />}
    </IconButton>
  )
}

function AddGroupView({ close }: Props) {
  const fieldGuids = useActivePortfolio((p) => p.fieldGuids)
  const fieldsByGuid = useActivePortfolio((p) => p.fieldsByGuid)
  const fields = fieldGuids
    .map((guid) => fieldsByGuid[guid])
    .filter((f) => f !== undefined)
  const displays = fields.map((f) => f.name)
  const [group, setLocalGroup] = useState<Group>({
    fieldGuid: fieldGuids[0],
  })

  const dispatch = useAppDispatch()

  const setFieldGuid = (guid: string) => {
    setLocalGroup({ fieldGuid: guid })
  }

  const onAdd = () => {
    dispatch(setGroup(group))
    close()
  }

  return (
    <>
      <Select
        value={group.fieldGuid}
        onChange={setFieldGuid}
        variants={fieldGuids}
        displays={displays}
      />
      <Button onClick={onAdd}>Add</Button>
    </>
  )
}

function AddFilterView({ close }: Props) {
  const dispatch = useAppDispatch()
  const fieldGuids = useActivePortfolio((p) => p.fieldGuids)
  const fieldsByGuid = useActivePortfolio((p) => p.fieldsByGuid)
  const fields = fieldGuids
    .map((guid) => fieldsByGuid[guid])
    .filter((f) => f?.t === "SelectField")
  const [filter, setLocalFilter] = useState<SelectFieldFilter>({
    t: "SelectFieldFilter",
    fieldGuid: fields[0].guid,
    values: [fields[0].selectOptions[0]],
  })

  const onAdd = () => {
    if (!filter) {
      Log.Error(`Missing filter`)
      return
    }
    dispatch(addFilter(filter))
    close()
  }

  return (
    <>
      <FilterEditor filter={filter} setFilter={setLocalFilter} />
      <Button disabled={!filter} onClick={onAdd}>
        Add
      </Button>
    </>
  )
}
