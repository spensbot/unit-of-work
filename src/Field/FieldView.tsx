import styled from "@emotion/styled"
import { Field, User, Number, Date, Select } from "./Field"

export default function FieldView({ field }: { field: Field }) {
  return <Root>{field.t}</Root>
}

function UserFieldView({ field }: { field: User }) {
  return <Root>{field.username}</Root>
}

function NumberFieldView({ field }: { field: Number }) {
  return <Root>{field.val}</Root>
}

function DateFieldView({ field }: { field: Date }) {
  return <Root>{field.unix}</Root>
}

function SelectFieldView({ field }: { field: Select }) {
  return <Root>{field.val}</Root>
}

const Root = styled.div``
