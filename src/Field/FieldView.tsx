import styled from "@emotion/styled"
import { Field, UserField, NumberField, DateField, SelectField } from "./Field"
import {
  UserFieldDef,
  NumberFieldDef,
  DateFieldDef,
  SelectFieldDef,
  FieldDef,
} from "./FieldDef"
import Select from "../components/Select"
import { useAppDispatch } from "../config/store"
import { setField } from "../Portfolio/portfolioSlice"
import NumberInput from "../components/NumberInput"
import { useDispatch } from "react-redux"
import UserSelect from "../User/UserSelect"
import { DatePicker } from "@mui/x-date-pickers"

interface Props<Def, T> {
  unitGuid: string
  def: Def
  field?: T
}

export default function FieldView({
  unitGuid,
  def,
  field,
}: Props<FieldDef, Field>) {
  switch (def.t) {
    case "UserFieldDef":
      return (
        <UserFieldView
          unitGuid={unitGuid}
          def={def}
          field={field?.t === "User" ? field : undefined}
        />
      )
    case "NumberFieldDef":
      return (
        <NumberFieldView
          unitGuid={unitGuid}
          def={def}
          field={field?.t === "Number" ? field : undefined}
        />
      )
    case "DateFieldDef":
      return (
        <DateFieldView
          unitGuid={unitGuid}
          def={def}
          field={field?.t === "Date" ? field : undefined}
        />
      )
    case "SelectFieldDef":
      return (
        <SelectFieldView
          unitGuid={unitGuid}
          def={def}
          field={field?.t === "Select" ? field : undefined}
        />
      )
  }
}

function UserFieldView({
  field,
  unitGuid,
  def,
}: Props<UserFieldDef, UserField>) {
  const dispatch = useDispatch()

  return (
    <UserSelect
      userGuid={field?.guid}
      onChange={(newUserGuid) =>
        dispatch(
          setField({
            unitGuid,
            fieldDefGuid: def.guid,
            val: {
              t: "User",
              guid: newUserGuid,
            },
          })
        )
      }
    />
  )
}

function NumberFieldView({
  field,
  unitGuid,
  def,
}: Props<NumberFieldDef, NumberField>) {
  const dispatch = useDispatch()
  return (
    <Root>
      <NumberInput
        value={field?.val}
        onChange={(newVal) =>
          dispatch(
            setField({
              fieldDefGuid: def.guid,
              val:
                newVal === undefined ? undefined : { t: "Number", val: newVal },
              unitGuid,
            })
          )
        }
      />
    </Root>
  )
}

function DateFieldView({
  unitGuid,
  field,
  def,
}: Props<DateFieldDef, DateField>) {
  let def2 = def
  return <DatePicker />
}

function SelectFieldView({
  unitGuid,
  field,
  def,
}: Props<SelectFieldDef, SelectField>) {
  const dispatch = useAppDispatch()

  return (
    <Root>
      <Select
        value={field?.val ?? null}
        onChange={(newVal) =>
          dispatch(
            setField({
              fieldDefGuid: def.guid,
              val:
                newVal === null
                  ? undefined
                  : { t: "Select", val: newVal ?? undefined },
              unitGuid,
            })
          )
        }
        variants={def.selectOptions}
      />
    </Root>
  )
}

const Root = styled.div``
