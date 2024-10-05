import styled from "@emotion/styled"
import { Field, UserField, NumberField, DateField, SelectField } from "./Field"

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

function UserFieldView({ field }: { field: UserField }) {
  return <Root>{field.guid}</Root>
}

function NumberFieldView({ field }: { field: NumberField }) {
  return <Root>{field.val}</Root>
}

function DateFieldView({ field }: { field: DateField }) {
  return <Root>{field.unix}</Root>
}

function SelectFieldView({ field }: { field: SelectField }) {
  return <Root>{field.val}</Root>
}

const Root = styled.div``
