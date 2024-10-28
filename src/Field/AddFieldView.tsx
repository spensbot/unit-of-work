import { Box, Button, Input, Typography } from "@mui/material"
import { useState } from "react"
import {
  Field,
  field_ts,
  newField,
  PropogateDownStrategy,
  SelectField,
} from "./Field"
import Select from "../components/Select"
import DisplayInput from "../components/DisplayInput"
import { useAppDispatch } from "../config/store"
import { addField } from "../Portfolio/portfolioSlice"

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
      <Typography variant="h5">Add Field</Typography>
      <DisplayInput value={field.name} onChange={setName} />
      <Select
        label="Propogate Down"
        value={field.propogateDown}
        onChange={setPropogateDown}
        variants={["Inherit"]}
      />
      <Select
        value={field.t}
        onChange={(t) => t && setT(t)}
        variants={field_ts}
      />
      {field.t === "SelectField" && (
        <SelectOptions field={field} setField={setField} />
      )}
      <Button
        color="primary"
        variant="contained"
        onClick={() => {
          dispatch(addField(field))
          close()
        }}
      >
        Save
      </Button>
    </Box>
  )
}

function SelectOptions({
  field,
  setField,
}: {
  field: SelectField
  setField: (field: Field) => void
}) {
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
