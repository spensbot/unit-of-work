import { UserField, NumberField, DateField, SelectField, Field } from "./Field"
import Select from "../components/Select"
import { useAppDispatch } from "../config/store"
import { setField } from "../Portfolio/portfolioSlice"
import NumberInput from "../components/NumberInput"
import { useDispatch } from "react-redux"
import UserSelect from "../User/UserSelect"
import { DatePicker } from "@mui/x-date-pickers"
import { useActivePortfolio } from "../Portfolio/Portfolio"
import * as f from "../util/functional"
import { Box, Typography } from "@mui/material"
import {
  FieldVal,
  NumberFieldVal,
  primaryWeighted,
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

  const [active, isCalculated, overwrite] =
    use_active_isCalculated_overwrite<UserFieldVal>(unitGuid, field, "User")

  function set(val: string | undefined) {
    dispatch(
      setField({
        fieldDefGuid: field.guid,
        unitGuid,
        val: f.map(val, (val) => ({
          t: "User",
          guids: { [val]: 1 },
        })),
      })
    )
  }

  return (
    <Box display="flex" alignItems="center">
      <UserSelect
        userGuid={f.map(active?.guids, primaryWeighted)}
        onChange={set}
        faded={isCalculated}
      />
      {overwrite !== undefined && (
        <OverwrittenView
          val={primaryWeighted(overwrite.guids)}
          clear={() => set(undefined)}
        />
      )}
    </Box>
  )
}

function NumberFieldView({ unitGuid, field }: Props<NumberField>) {
  const dispatch = useDispatch()

  const [active, isCalculated, overwrite] =
    use_active_isCalculated_overwrite<NumberFieldVal>(unitGuid, field, "Number")

  function set(val: number | undefined) {
    dispatch(
      setField({
        fieldDefGuid: field.guid,
        unitGuid,
        val: f.map(val, (val) => ({
          t: "Number",
          val,
        })),
      })
    )
  }

  return (
    <Box display="flex" alignItems="center" position="relative">
      <NumberInput
        value={active?.val}
        onChange={set}
        faded={isCalculated}
        split={overwrite === undefined ? 0.5 : 0.75}
      />
      {overwrite && (
        <OverwrittenView
          val={overwrite.toString()}
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

  const [active, isCalculated, overwrite] =
    use_active_isCalculated_overwrite<SelectFieldVal>(unitGuid, field, "Select")

  function set(val: string | undefined) {
    dispatch(
      setField({
        fieldDefGuid: field.guid,
        unitGuid,
        val: f.map(val, (val) => ({ t: "Select", vals: { [val]: 1 } })),
      })
    )
  }

  // console.log(f.map(active, primaryWeighted))
  // console.log(overwrite)

  return (
    <Box display="flex" alignItems="center" position="relative">
      <Select
        value={f.map(active?.vals, primaryWeighted)}
        onChange={set}
        variants={field.selectOptions}
        faded={isCalculated}
        split={overwrite === undefined ? 0.5 : 0.75}
      />
      {overwrite !== undefined && (
        <OverwrittenView
          val={primaryWeighted(overwrite.vals)}
          clear={() => set(undefined)}
        />
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
      left={3}
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

function use_active_isCalculated_overwrite<T extends FieldVal>(
  unitGuid: string,
  field: Field,
  t: T["t"]
): [T | undefined, boolean, T | undefined] {
  const explicit = useActivePortfolio((p) => {
    const val = p.unitsByGuid[unitGuid].fieldValsByGuid[field.guid]

    if (val?.t === t) return val as T
  })

  const calculated = useActivePortfolio((p) => {
    const val = p.unitsByGuid[unitGuid].calculatedFieldValsByGuid?.[field.guid]

    if (val?.t === t) return val as T
  })

  const overwrite =
    explicit !== undefined && calculated !== undefined ? explicit : undefined

  const isCalculated = explicit === undefined && calculated !== undefined

  const active = explicit ?? calculated

  return [active, isCalculated, overwrite]
}
