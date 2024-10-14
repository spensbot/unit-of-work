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
import getFieldVal from "./getFieldVal"
import { useActivePortfolio } from "../Portfolio/Portfolio"

interface Props<F, Val> {
  unitGuid: string
  field: F
  val?: Val
}

export default function FieldView({
  unitGuid,
  field,
  val,
}: Props<Field, FieldVal>) {
  switch (field.t) {
    case "UserField":
      return (
        <UserFieldView
          unitGuid={unitGuid}
          field={field}
          val={val?.t === "User" ? val : undefined}
        />
      )
    case "NumberField":
      return (
        <NumberFieldView
          unitGuid={unitGuid}
          field={field}
          val={val?.t === "Number" ? val : undefined}
        />
      )
    case "DateField":
      return (
        <DateFieldView
          unitGuid={unitGuid}
          field={field}
          val={val?.t === "Date" ? val : undefined}
        />
      )
    case "SelectField":
      return (
        <SelectFieldView
          unitGuid={unitGuid}
          field={field}
          val={val?.t === "Select" ? val : undefined}
        />
      )
  }
}

function UserFieldView({
  unitGuid,
  field,
  val,
}: Props<UserField, UserFieldVal>) {
  const dispatch = useDispatch()
  const userGuid = useActivePortfolio((p) => {
    const val = getFieldVal(p.unitsByGuid[unitGuid], field, p)
    return val?.t === "User" ? val.guid : undefined
  })

  return (
    <UserSelect
      userGuid={val?.guid}
      onChange={(newUserGuid) =>
        dispatch(
          setField({
            unitGuid,
            fieldDefGuid: field.guid,
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
  unitGuid,
  field,
  val,
}: Props<NumberField, NumberFieldVal>) {
  const dispatch = useDispatch()
  return (
    <Root>
      <NumberInput
        value={val?.val}
        onChange={(newVal) =>
          dispatch(
            setField({
              fieldDefGuid: field.guid,
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
  val,
}: Props<SelectField, SelectFieldVal>) {
  const dispatch = useAppDispatch()

  return (
    <Root>
      <Select
        value={val?.val ?? null}
        onChange={(newVal) =>
          dispatch(
            setField({
              fieldDefGuid: field.guid,
              val:
                newVal === null
                  ? undefined
                  : { t: "Select", val: newVal ?? undefined },
              unitGuid,
            })
          )
        }
        variants={field.selectOptions}
      />
    </Root>
  )
}

const Root = styled.div``
