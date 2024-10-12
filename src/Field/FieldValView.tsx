import styled from "@emotion/styled"
import {
  FieldVal,
  UserFieldVal,
  NumberFieldVal,
  DateFieldVal,
  SelectFieldVal,
} from "./FieldVal"
import { UserField, NumberField, DateField, SelectField, Field } from "./Field"
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
}: Props<Field, FieldVal>) {
  switch (def.t) {
    case "UserField":
      return (
        <UserFieldView
          unitGuid={unitGuid}
          def={def}
          field={field?.t === "User" ? field : undefined}
        />
      )
    case "NumberField":
      return (
        <NumberFieldView
          unitGuid={unitGuid}
          def={def}
          field={field?.t === "Number" ? field : undefined}
        />
      )
    case "DateField":
      return (
        <DateFieldView
          unitGuid={unitGuid}
          def={def}
          field={field?.t === "Date" ? field : undefined}
        />
      )
    case "SelectField":
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
}: Props<UserField, UserFieldVal>) {
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
}: Props<NumberField, NumberFieldVal>) {
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

function DateFieldView(_props: Props<DateField, DateFieldVal>) {
  return <DatePicker slotProps={{ textField: { size: "small" } }} />
}

function SelectFieldView({
  unitGuid,
  field,
  def,
}: Props<SelectField, SelectFieldVal>) {
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
