import styled from "@emotion/styled"
import { Field, User, Number, Date, Select } from "./Field"

export default function FieldView({ field }: { field?: Field }) {
  if (field === undefined) {
    return null
  }

  switch (field.t) {
    case "User":
      return <UserFieldView field={field} />
    case "Number":
      return <NumberFieldView field={field} />
    case "Date":
      return <DateFieldView field={field} />
    case "Select":
      return <SelectFieldView field={field} />
  }
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
