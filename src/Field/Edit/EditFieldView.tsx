import { Box, Button, Typography } from "@mui/material"
import { useAppDispatch } from "../../config/store"
import { addField, deleteField } from "../../Portfolio/portfolioSlice"
import FieldEditor from "./FieldEditor"
import { useState } from "react"
import { Field } from "../Field"
import { useActivePortfolio } from "../../Portfolio/Portfolio"

interface Props {
  field: Field
  setField: (field: Field) => void
}

export default function EditFieldView({ field, setField }: Props) {
  const [fieldEdit, setFieldEdit] = useState<Field>(field)
  const dispatch = useAppDispatch()

  const onDelete = () => {
    dispatch(deleteField({ guid: field.guid }))
  }

  return (
    <Box
      padding={2}
      display="flex"
      flexDirection="column"
      gap={2}
      minWidth={300}
    >
      <FieldEditor mode="Edit" field={fieldEdit} setField={setFieldEdit} />
      <Box display="flex" alignSelf="stretch" gap={2}>
        <Button
          sx={{ flex: "1 0 auto" }}
          variant="contained"
          onClick={() => setField(fieldEdit)}
        >
          Save
        </Button>
        <Button
          sx={{ flex: "1 0 auto" }}
          color="error"
          variant="contained"
          onClick={onDelete}
        >
          Delete
        </Button>
      </Box>
    </Box>
  )
}
