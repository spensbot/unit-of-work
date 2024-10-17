import styled from "@emotion/styled"
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
import * as f from "../util/functional"

interface Props<F> {
  unitGuid: string
  field: F
}

export default function FieldView({ unitGuid, field }: Props<Field>) {
  switch (field.t) {
    case "UserField":
      return <UserFieldView unitGuid={unitGuid} field={field} />
    case "NumberField":
      return <NumberFieldView unitGuid={unitGuid} field={field} />
    case "DateField":
      return <DateFieldView unitGuid={unitGuid} field={field} />
    case "SelectField":
      return <SelectFieldView unitGuid={unitGuid} field={field} />
  }
}

function UserFieldView({ unitGuid, field }: Props<UserField>) {
  const dispatch = useDispatch()
  const userGuid = useActivePortfolio((p) => {
    const val = getFieldVal(p.unitsByGuid[unitGuid], field, p)
    return val?.t === "User" ? val.guid : undefined
  })

  return (
    <UserSelect
      userGuid={userGuid}
      onChange={(newUserGuid) =>
        dispatch(
          setField({
            unitGuid,
            fieldDefGuid: field.guid,
            val: f.mapUndefined(newUserGuid, (guid) => ({ t: "User", guid })),
          })
        )
      }
    />
  )
}

function NumberFieldView({ unitGuid, field }: Props<NumberField>) {
  const dispatch = useDispatch()
  const numberValue = useActivePortfolio((p) => {
    const val = getFieldVal(p.unitsByGuid[unitGuid], field, p)
    return val?.t === "Number" ? val.val : undefined
  })

  console.log(numberValue)

  return (
    <Root>
      <NumberInput
        value={numberValue}
        onChange={(newVal) =>
          dispatch(
            setField({
              fieldDefGuid: field.guid,
              unitGuid,
              val: f.mapUndefined(newVal, (val) => ({ t: "Number", val })),
            })
          )
        }
      />
    </Root>
  )
}

function DateFieldView(_props: Props<DateField>) {
  return <DatePicker slotProps={{ textField: { size: "small" } }} />
}

function SelectFieldView({ unitGuid, field }: Props<SelectField>) {
  const dispatch = useAppDispatch()
  const selectValue = useActivePortfolio((p) => {
    const val = getFieldVal(p.unitsByGuid[unitGuid], field, p)
    return val?.t === "Select" ? val.val : undefined
  })

  return (
    <Root>
      <Select
        value={selectValue}
        onChange={(newVal) =>
          dispatch(
            setField({
              fieldDefGuid: field.guid,
              unitGuid,
              val: f.mapUndefined(newVal, (val) => ({ t: "Select", val })),
            })
          )
        }
        variants={field.selectOptions}
      />
    </Root>
  )
}

const Root = styled.div``
