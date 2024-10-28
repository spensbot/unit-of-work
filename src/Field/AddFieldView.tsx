import { Box, Button, Typography } from "@mui/material"
import { useMemo, useState } from "react"
import {
  DateField,
  Field,
  field_ts,
  newField,
  NumberField,
  PropogateDownStrategy,
  ReduceStrategy,
  SelectField,
  UserField,
} from "./Field"
import Select from "../components/Select"
import DisplayInput from "../components/DisplayInput"
import { useAppDispatch } from "../config/store"
import { addField } from "../Portfolio/portfolioSlice"
import { useActivePortfolio } from "../Portfolio/Portfolio"

export default function AddFieldView({ close }: { close: () => void }) {
  const [field, setField] = useState<Field>(newField("NumberField"))
  const dispatch = useAppDispatch()

  console.log(field)

  const setName = (name: string) => setField({ ...field, name })
  const setPropogateDown = (propogateDown?: PropogateDownStrategy) =>
    setField({ ...field, propogateDown })
  const setT = (t: Field["t"]) => {
    const { guid, name, propogateDown } = field
    if (t === "SelectField") {
      setField({ t, guid, name, propogateDown, selectOptions: [] })
    } else {
      setField({ t, guid, name, propogateDown })
    }
  }

  return (
    <Box
      padding={2}
      display="flex"
      flexDirection="column"
      alignItems="end"
      gap={2}
      minWidth={300}
    >
      <Select
        value={field.t}
        onChange={(t) => t && setT(t)}
        variants={field_ts}
      />
      <DisplayInput value={field.name} onChange={setName} />
      <Select
        label="Propogate Down"
        value={field.propogateDown}
        onChange={setPropogateDown}
        variants={["Inherit"]}
      />
      {field.t === "SelectField" && (
        <SelectOptions field={field} setField={setField} />
      )}
      {(field.t === "UserField" || field.t === "SelectField") && (
        <GroupStrategyView field={field} setField={setField} />
      )}
      {(field.t === "NumberField" || field.t === "DateField") && (
        <ReduceStrategyView field={field} setField={setField} />
      )}
      <Button
        color="primary"
        variant="contained"
        onClick={() => {
          dispatch(addField(field))
          close()
        }}
      >
        Add
      </Button>
    </Box>
  )
}

interface SubProps<T> {
  field: T
  setField: (field: Field) => void
}

function SelectOptions({ field, setField }: SubProps<SelectField>) {
  const [newOption, setNewOption] = useState("")

  const addOption = () => {
    if (!field.selectOptions.includes(newOption)) {
      setField({ ...field, selectOptions: [...field.selectOptions, newOption] })
    }
  }

  return (
    <Box>
      {field.selectOptions.map((option) => (
        <Box key={option}>{option}</Box>
      ))}
      <Box display="flex">
        <DisplayInput value={newOption} onChange={setNewOption} />
        <Button disabled={newOption.length === 0} onClick={addOption}>
          Add
        </Button>
      </Box>
    </Box>
  )
}

function GroupStrategyView({
  field,
  setField,
}: SubProps<SelectField | UserField>) {
  const fieldGuids = useActivePortfolio((p) => p.fieldGuids)
  const fieldsByGuid = useActivePortfolio((p) => p.fieldsByGuid)

  const weightFields = useMemo(
    () =>
      fieldGuids
        .map((guid) => fieldsByGuid[guid])
        .filter((f) => f.t === "NumberField"),
    [fieldGuids, fieldsByGuid]
  )

  const weightFieldGuids = weightFields.map((f) => f.guid)
  const displays = weightFields.map((f) => f.name)

  const setWeightFieldGuid = (weightFieldGuid?: string) => {
    setField({
      ...field,
      propogateUp: {
        t: "Group",
        weightFieldGuid,
      },
    })
  }

  return (
    <Select
      label="Weight Field"
      value={field.propogateUp?.weightFieldGuid}
      onChange={setWeightFieldGuid}
      variants={weightFieldGuids}
      displays={displays}
    />
  )
}

function ReduceStrategyView({
  field,
  setField,
}: SubProps<NumberField | DateField>) {
  const set = (func?: ReduceStrategy["func"]) => {
    const propogateUp: ReduceStrategy | undefined = func && {
      t: "Reduce",
      func,
    }

    setField({ ...field, propogateUp })
  }

  return (
    <Select
      label="Propogate Up"
      value={field.propogateUp?.func}
      onChange={set}
      variants={["Sum", "Max", "Min"]}
    />
  )
}
