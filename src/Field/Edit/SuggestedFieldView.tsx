import { Button } from "@mui/material"
import { Field } from "../Field"
import { v4 as uuidV4 } from "uuid"
import { useEffect } from "react"

export default function SuggestedFieldView({
  setField,
}: {
  setField: (field: Field) => void
}) {
  return (
    <>
      {suggestedFields.map((field, index) => (
        <Button
          fullWidth
          variant="outlined"
          key={field.name}
          onClick={() => {
            const f = {
              ...field,
              guid: uuidV4(),
            }
            setField(f)
          }}
        >
          {field.name}
        </Button>
      ))}
    </>
  )
}

const suggestedFields: readonly Field[] = [
  {
    t: "UserField",
    guid: "",
    name: "Assignee",
    propogateDown: "Inherit",
    propogateUp: {
      t: "Group",
    },
  },
  {
    t: "NumberField",
    guid: "",
    name: "Days",
    propogateUp: {
      t: "Reduce",
      func: "Sum",
    },
  },
  {
    t: "SelectField",
    guid: "",
    name: "Status",
    propogateDown: "Inherit",
    propogateUp: {
      t: "Group",
    },
    selectOptions: ["Todo", "In Progress", "Complete"],
  },
  {
    t: "SelectField",
    guid: "",
    name: "Product",
    propogateDown: "Inherit",
    propogateUp: {
      t: "Group",
    },
    selectOptions: ["Solitaire", "Sudoku", "BrainBridge"],
  },
]
