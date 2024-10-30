import { Box, Button } from "@mui/material"
import { useState } from "react"
import { Field, newField } from "../Field"
import { useAppDispatch } from "../../config/store"
import { addField } from "../../Portfolio/portfolioSlice"
import SelectGroup from "../../components/SelectGroup"
import SuggestedFieldView from "./SuggestedFieldView"
import FieldEditor from "./FieldEditor"
import PopoverBox from "../../components/PopoverBox"

export default function AddFieldView({ close }: { close: () => void }) {
  const [mode, setMode] = useState<"Custom" | "Suggested">("Suggested")
  const [field, setField] = useState<Field>(newField("NumberField"))
  const dispatch = useAppDispatch()

  return (
    <PopoverBox>
      <SelectGroup
        value={mode}
        onChange={setMode}
        variants={["Custom", "Suggested"]}
      />
      {mode === "Custom" ? (
        <>
          <FieldEditor mode="Create" field={field} setField={setField} />
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
        </>
      ) : (
        <SuggestedFieldView
          setField={(newField) => {
            dispatch(addField(newField))
            close()
          }}
        />
      )}
    </PopoverBox>
  )
}
