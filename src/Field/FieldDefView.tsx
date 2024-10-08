import styled from "@emotion/styled"
import { FieldDef } from "./FieldDef"

export default function FieldDefView({ def }: { def: FieldDef }) {
  return <Root>{def.name}</Root>
}

const Root = styled.div``
