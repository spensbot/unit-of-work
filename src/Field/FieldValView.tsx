import { UserField, NumberField, DateField, SelectField, Field } from "./Field"
import Select from "../components/Select"
import { useAppDispatch } from "../config/store"
import { setField } from "../Portfolio/portfolioSlice"
import NumberInput from "../components/NumberInput"
import { useDispatch } from "react-redux"
import UserSelect from "../User/UserSelect"
import { DatePicker } from "@mui/x-date-pickers"
import { getCalculatedFieldVal, getExplicitFieldVal } from "./getFieldVal"
import { useActivePortfolio } from "../Portfolio/Portfolio"
import * as f from "../util/functional"
import { Box, Typography } from "@mui/material"
import {
  FieldVal,
  NumberFieldVal,
  SelectFieldVal,
  UserFieldVal,
} from "./FieldVal"

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
  const [explicit, calculated, overwritten] =
    useExplicit_Calculated_Overwritten(
      unitGuid,
      field,
      (val: UserFieldVal) => val.guid,
      "User"
    )

  function set(val: string | undefined) {
    dispatch(
      setField({
        fieldDefGuid: field.guid,
        unitGuid,
        val: f.mapUndefined(val, (val) => ({ t: "Select", val })),
      })
    )
  }

  return (
    <Box display="flex" alignItems="center">
      <UserSelect
        userGuid={explicit ?? calculated}
        onChange={(newUserGuid) =>
          dispatch(
            setField({
              unitGuid,
              fieldDefGuid: field.guid,
              val: f.mapUndefined(newUserGuid, (guid) => ({ t: "User", guid })),
            })
          )
        }
        faded={explicit === undefined && calculated !== undefined}
      />
      {overwritten && (
        <OverwrittenView
          val={overwritten.toString()}
          clear={() => set(undefined)}
        />
      )}
    </Box>
  )
}

function NumberFieldView({ unitGuid, field }: Props<NumberField>) {
  const dispatch = useDispatch()
  const [explicit, calculated, overwritten] =
    useExplicit_Calculated_Overwritten(
      unitGuid,
      field,
      (val: NumberFieldVal) => val.val,
      "Number"
    )

  function set(val: string | undefined) {
    dispatch(
      setField({
        fieldDefGuid: field.guid,
        unitGuid,
        val: f.mapUndefined(val, (val) => ({ t: "Select", val })),
      })
    )
  }

  return (
    <Box display="flex" alignItems="center" position="relative">
      <NumberInput
        value={explicit ?? calculated}
        onChange={(newVal) =>
          dispatch(
            setField({
              fieldDefGuid: field.guid,
              unitGuid,
              val: f.mapUndefined(newVal, (val) => ({ t: "Number", val })),
            })
          )
        }
        faded={explicit === undefined && calculated !== undefined}
        split={overwritten ? 0.75 : 0.5}
      />
      {overwritten && (
        <OverwrittenView
          val={overwritten.toString()}
          clear={() => set(undefined)}
        />
      )}
    </Box>
  )
}

function DateFieldView(_props: Props<DateField>) {
  return <DatePicker slotProps={{ textField: { size: "small" } }} />
}

function SelectFieldView({ unitGuid, field }: Props<SelectField>) {
  const dispatch = useAppDispatch()

  const [explicit, calculated, overwritten] =
    useExplicit_Calculated_Overwritten(
      unitGuid,
      field,
      (val: SelectFieldVal) => val.val,
      "Select"
    )

  function set(val: string | undefined) {
    dispatch(
      setField({
        fieldDefGuid: field.guid,
        unitGuid,
        val: f.mapUndefined(val, (val) => ({ t: "Select", val })),
      })
    )
  }

  return (
    <Box display="flex" alignItems="center" position="relative">
      <Select
        value={explicit ?? calculated}
        onChange={(newVal) => set(newVal)}
        variants={field.selectOptions}
        faded={explicit === undefined && calculated !== undefined}
        split={overwritten ? 0.75 : 0.5}
      />
      {overwritten && (
        <OverwrittenView val={overwritten} clear={() => set(undefined)} />
      )}
    </Box>
  )
}

function OverwrittenView({ val, clear }: { val: string; clear: () => void }) {
  let variant = "primary"
  variant = "secondary"
  // variant = "error"
  // variant = "warning"
  // variant = "info"
  return (
    <Box
      position="absolute"
      paddingX={1}
      paddingY={0}
      left={-3}
      top={-3}
      borderRadius={100}
      bgcolor={`${variant}.main`}
    >
      <Typography
        sx={{
          fontSize: 15,
          color: `${variant}.contrastText`,
          textDecoration: "line-through",
          ":hover": { cursor: "pointer" },
          margin: -0.2,
          padding: 0,
        }}
        onClick={clear}
      >
        {val}
      </Typography>
    </Box>
  )
}

function useExplicit_Calculated_Overwritten<T extends FieldVal, U>(
  unitGuid: string,
  field: Field,
  map: (val: T) => U,
  t: T["t"]
): [U | undefined, U | undefined, U | undefined] {
  const explicit = useActivePortfolio((p) =>
    f.mapUndefined(
      getExplicitFieldVal<T>(p.unitsByGuid[unitGuid], field, t),
      map
    )
  )

  const calculated = useActivePortfolio((p) =>
    f.mapUndefined(
      getCalculatedFieldVal<T>(p.unitsByGuid[unitGuid], field, p, t),
      map
    )
  )

  const overwritten =
    explicit !== undefined && calculated !== undefined ? calculated : undefined

  return [explicit, calculated, overwritten]
}
