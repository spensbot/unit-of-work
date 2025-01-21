import styled from "@emotion/styled"
import DisplayInput from "./DisplayInput"
import { useState } from "react"
import { Box } from "@mui/material"
import { Log } from "../util/Log"

interface Props {
  value?: number
  onChange: (newValue?: number) => void
  faded?: boolean
  split?: number
}

export default function NumberInput({ value, onChange, faded, split }: Props) {
  const valString = toString(value)
  const [text, setText] = useState(valString)

  let isError = parseNum(text) === null && text !== ""

  if (!isError && text !== valString) {
    setText(valString)
  }

  if (isError) {
    Log.Temp(`Error parsing number: ${text}`)
  }

  return (
    <Box bgcolor={isError ? "error.dark" : "inherit"}>
      <DisplayInput
        value={text}
        onChange={(newText) => {
          setText(newText)
          if (newText === "") {
            onChange(undefined)
          } else {
            const num = parseNum(newText)
            if (num !== null) {
              onChange(num)
            }
          }
        }}
        faded={faded}
        split={split}
      />
    </Box>
  )
}

function toString(val: number | undefined): string {
  return val?.toString() ?? ""
}

function parseNum(text: string): number | null {
  const num = parseFloat(text)
  if (isNaN(num)) return null
  return num
}
