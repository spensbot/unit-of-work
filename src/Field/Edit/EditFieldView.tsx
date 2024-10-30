import { Box, Button } from "@mui/material"
import { useAppDispatch } from "../../config/store"
import { deleteField } from "../../Portfolio/portfolioSlice"
import FieldEditor from "./FieldEditor"
import { useState } from "react"
import { Field } from "../Field"
import PopoverBox from "../../components/PopoverBox"

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
    <PopoverBox>
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
    </PopoverBox>
  )
}
