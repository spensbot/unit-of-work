import styled from "@emotion/styled"
import { Field } from "./Field"

export default function FieldView({ def }: { def: Field }) {
  return <Root>{def.name}</Root>
}

const Root = styled.div``
