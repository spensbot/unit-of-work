import { Button } from "@mui/material"
import { Field } from "../Field"
import { uowGuid } from "../../util/guid"

export default function SuggestedFieldView({
  setField,
}: {
  setField: (field: Field) => void
}) {
  return (
    <>
      {suggestedFields.map((field) => (
        <Button
          fullWidth
          variant="outlined"
          key={field.name}
          onClick={() => {
            const f = {
              ...field,
              guid: uowGuid(),
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
