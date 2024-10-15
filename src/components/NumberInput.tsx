import styled from "@emotion/styled"
import DisplayInput from "./DisplayInput"
import { useState } from "react"

interface Props {
  value?: number
  onChange: (newValue?: number) => void
}

export default function NumberInput({ value, onChange }: Props) {
  const valString = toString(value)
  const [text, setText] = useState(valString)

  let isError = parseNum(text) === null && text !== ""

  if (!isError && text !== valString) {
    setText(valString)
  }

  return (
    <Root isError={isError}>
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
      />
    </Root>
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

const Root = styled.div<{ isError: boolean }>`
  color: ${(props) => props.theme.palette.error.main};
  background-color: ${(props) =>
    props.isError && props.theme.palette.error.dark};
`
