import { Box, Button, Typography } from "@mui/material"
import { useState } from "react"
import { Field, field_ts, newField, PropogateDownStrategy } from "./Field"
import Select from "../components/Select"
import DisplayInput from "../components/DisplayInput"
import { useAppDispatch } from "../config/store"
import { addField } from "../Portfolio/portfolioSlice"

export default function AddFieldView() {
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
      <Button
        color="primary"
        variant="contained"
        onClick={() => dispatch(addField(field))}
      >
        Save
      </Button>
    </Box>
  )
}
