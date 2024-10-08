import styled from "@emotion/styled"
import DisplayInput from "./DisplayInput"
import { useState } from "react"

interface Props {
  value: number
  onChange: (newValue: number) => void
}

export default function NumberInput({ value, onChange }: Props) {
  const [text, setText] = useState(value.toString())

  console.log(text)
  let isError = parseNum(text) === null
  console.log(parseNum(text))
  console.log(isError)

  return (
    <Root isError={isError}>
      <DisplayInput
        value={text}
        onChange={(newText) => {
          const num = parseNum(newText)
          setText(newText)
          if (num !== null) {
            onChange(num)
          }
        }}
      />
    </Root>
  )
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
