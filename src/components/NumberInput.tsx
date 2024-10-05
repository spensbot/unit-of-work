import styled from "@emotion/styled"
import DisplayInput from "./DisplayInput"
import { useState } from "react"

interface Props {
  value: number
  onChange: (newValue: number) => void
}

export default function NumberInput({ value, onChange }: Props) {
  const [text, setText] = useState(value.toString())

  return (
    <Root>
      <DisplayInput
        value={text}
        onChange={(newText) => {
          const num = parseFloat(newText)
          setText(newText)
          if (!isNaN(num)) {
            onChange(num)
          }
        }}
      />
    </Root>
  )
}

const Root = styled.div``
