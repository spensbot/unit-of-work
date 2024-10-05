import styled from "@emotion/styled"
import {
  Field,
  FieldDef,
  UserField,
  NumberField,
  DateField,
  SelectField,
} from "./Field"
import Select from "../components/Select"
import { useAppDispatch } from "../config/store"
import { setField } from "../Portfolio/portfolioSlice"
import NumberInput from "../components/NumberInput"
import { useDispatch } from "react-redux"

interface Props<T> {
  unitGuid: string
  field: T
  def: FieldDef
}

export default function FieldView({
  unitGuid,
  field,
  def,
}: Props<Field | undefined>) {
  if (field === undefined) {
    return null
  }

  switch (field.t) {
    case "User":
      return <UserFieldView field={field} />
    case "Number":
      return <NumberFieldView unitGuid={unitGuid} field={field} def={def} />
    case "Date":
      return <DateFieldView field={field} />
    case "Select":
      return <SelectFieldView unitGuid={unitGuid} field={field} def={def} />
  }
}

function UserFieldView({ field }: { field: UserField }) {
  return <Root>{field.guid}</Root>
}

function NumberFieldView({ field, unitGuid, def }: Props<NumberField>) {
  const dispatch = useDispatch()
  return (
    <Root>
      <NumberInput
        value={field.val}
        onChange={(newVal) =>
          dispatch(
            setField({
              fieldDefGuid: def.guid,
              val: { t: "Number", val: newVal },
              unitGuid,
            })
          )
        }
      />
    </Root>
  )
}

function DateFieldView({ field }: { field: DateField }) {
  return <Root>{field.unix}</Root>
}

function SelectFieldView({
  unitGuid,
  field,
  def,
}: {
  unitGuid: string
  field: SelectField
  def: FieldDef
}) {
  const dispatch = useAppDispatch()

  return (
    <Root>
      <Select
        value={field.val}
        onChange={(newVal) =>
          dispatch(
            setField({
              fieldDefGuid: def.guid,
              val: { t: "Select", val: newVal },
              unitGuid,
            })
          )
        }
        variants={def.selectOptions!}
      />
    </Root>
  )
}

const Root = styled.div``
