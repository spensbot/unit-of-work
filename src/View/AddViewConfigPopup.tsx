import { Box, Button, IconButton } from "@mui/material"
import Select from "../components/Select"
import { useState } from "react"
import { useAppDispatch } from "../config/store"
import { Group, Sort } from "./View"
import { useActivePortfolio } from "../Portfolio/Portfolio"
import { setGroup, setSort } from "../Portfolio/portfolioSlice"
import { ArrowUpward, ArrowDownward } from "@mui/icons-material"

type ConfigType = "Sort" | "Group" | "Filter"
const configTypes: readonly ConfigType[] = ["Sort", "Group", "Filter"]

interface Props {
  close: () => void
}

export default function AddViewConfigPopup({ close }: Props) {
  const [configType, setConfigType] = useState<ConfigType>("Sort")

  return (
    <Box
      padding={2}
      display="flex"
      flexDirection="column"
      alignItems="end"
      minWidth={300}
      gap={2}
    >
      <Select
        value={configType}
        onChange={(type) => type && setConfigType(type)}
        variants={configTypes}
      />
      {configType === "Sort" && <AddSortView close={close} />}
      {configType === "Group" && <AddGroupView close={close} />}
      {configType === "Filter" && <AddFilterView close={close} />}
    </Box>
  )
}

function AddSortView({ close }: Props) {
  const [sort, setLocalSort] = useState<Sort>()
  const fieldGuids = useActivePortfolio((p) => p.fieldGuids)
  const fieldsByGuid = useActivePortfolio((p) => p.fieldsByGuid)
  const fields = fieldGuids.map((guid) => fieldsByGuid[guid])
  const displays = fields.map((f) => f.name)
  const dispatch = useAppDispatch()

  const setFieldGuid = (guid?: string) => {
    if (!guid) return
    setLocalSort({ ascending: sort?.ascending ?? false, fieldGuid: guid })
  }

  const setAscending = (ascending: boolean) => {
    if (!sort) return
    setLocalSort({ ...sort, ascending })
  }

  const onAdd = () => {
    if (!sort) return
    dispatch(setSort(sort))
    close()
  }

  return (
    <>
      <Select
        value={sort?.fieldGuid}
        onChange={setFieldGuid}
        variants={fieldGuids}
        displays={displays}
      />
      <AscendingButton
        ascending={sort?.ascending ?? false}
        setAscending={setAscending}
      />
      <Button disabled={!sort} onClick={onAdd}>
        Add
      </Button>
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
  const [group, setLocalGroup] = useState<Group>()
  const fieldGuids = useActivePortfolio((p) => p.fieldGuids)
  const fieldsByGuid = useActivePortfolio((p) => p.fieldsByGuid)
  const fields = fieldGuids.map((guid) => fieldsByGuid[guid])
  const displays = fields.map((f) => f.name)
  const dispatch = useAppDispatch()

  const setFieldGuid = (guid?: string) => {
    if (!guid) return
    setLocalGroup({ fieldGuid: guid })
  }

  const onAdd = () => {
    if (!group) return
    dispatch(setGroup(group))
    close()
  }

  return (
    <>
      <Select
        value={group?.fieldGuid}
        onChange={setFieldGuid}
        variants={fieldGuids}
        displays={displays}
      />
      <Button disabled={!group} onClick={onAdd}>
        Add
      </Button>
    </>
  )
}

function AddFilterView({ close }: Props) {
  return <Box>Filter</Box>
}
