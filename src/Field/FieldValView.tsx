import {
  UserField,
  NumberField,
  DateField,
  SelectField,
  Field,
  CalculatedField,
} from "./Field"
import Select from "../components/Select"
import { useAppDispatch } from "../config/store"
import { setFieldVal } from "../Portfolio/portfolioSlice"
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
import MultiSelectView from "./MultiSelectView"

interface Props<F> {
  unitGuid: string
  field: F
}

export default function FieldValView({ unitGuid, field }: Props<Field>) {
  switch (field.t) {
    case "UserField":
      return <UserFieldView unitGuid={unitGuid} field={field} />
    case "NumberField":
      return <NumberFieldView unitGuid={unitGuid} field={field} />
    case "DateField":
      return <DateFieldView unitGuid={unitGuid} field={field} />
    case "SelectField":
      return <SelectFieldView unitGuid={unitGuid} field={field} />
    case "CalculatedField":
      return <CalculatedFieldView unitGuid={unitGuid} field={field} />
  }
}

function UserFieldView({ unitGuid, field }: Props<UserField>) {
  const dispatch = useDispatch()

  const [active, isCalculated, overwritten] =
    use_active_isCalculated_overwritten<UserFieldVal>(unitGuid, field, "User")
  const users = useActivePortfolio((p) => p.usersByGuid)

  function set(val: string | undefined) {
    dispatch(
      setFieldVal({
        fieldGuid: field.guid,
        unitGuid,
        val: f.mapUndef(val, (val) => ({
          t: "User",
          guids: { [val]: 1 },
        })),
      })
    )
  }

  const nVals = active ? Object.keys(active?.guids).length : 0

  if (isCalculated && nVals > 1)
    return (
      <MultiSelectView
        vals={f.mapKeys(active!.guids, (guid) => users[guid].username)}
      />
    )

  return (
    <Box position="relative">
      <UserSelect
        userGuid={f.mapUndef(active?.guids, primaryWeighted)}
        onChange={set}
        faded={isCalculated}
      />
      {overwritten !== undefined && (
        <OverwrittenView
          val={users[primaryWeighted(overwritten.guids)].username}
          clear={() => set(undefined)}
        />
      )}
    </Box>
  )
}

function NumberFieldView({ unitGuid, field }: Props<NumberField>) {
  const dispatch = useDispatch()

  const [active, isCalculated, overwritten] =
    use_active_isCalculated_overwritten<NumberFieldVal>(
      unitGuid,
      field,
      "Number"
    )

  function set(val: number | undefined) {
    dispatch(
      setFieldVal({
        fieldGuid: field.guid,
        unitGuid,
        val: f.mapUndef(val, (val) => ({
          t: "Number",
          val,
        })),
      })
    )
  }

  return (
    <Box position="relative">
      <NumberInput
        value={active?.val}
        onChange={set}
        faded={isCalculated}
        split={overwritten === undefined ? 0.5 : 0.75}
      />
      {overwritten && (
        <OverwrittenView
          val={overwritten.val.toString()}
          clear={() => set(undefined)}
        />
      )}
    </Box>
  )
}

function CalculatedFieldView({ unitGuid, field }: Props<CalculatedField>) {
  const calculated = useActivePortfolio((p) => {
    const val = p.unitsByGuid[unitGuid].calculatedFieldValsByGuid?.[field.guid]

    if (val?.t === "Number") return val as NumberFieldVal
  })

  const text = calculated === undefined ? "-" : calculated.val.toPrecision(2)

  return (
    <Box padding={1}>
      <Typography color="primary">{text}</Typography>
    </Box>
  )
}

function DateFieldView(_props: Props<DateField>) {
  return <DatePicker slotProps={{ textField: { size: "small" } }} />
}

function SelectFieldView({ unitGuid, field }: Props<SelectField>) {
  const dispatch = useAppDispatch()

  const [active, isCalculated, overwritten] =
    use_active_isCalculated_overwritten<SelectFieldVal>(
      unitGuid,
      field,
      "Select"
    )

  function set(val: string | undefined) {
    dispatch(
      setFieldVal({
        fieldGuid: field.guid,
        unitGuid,
        val: f.mapUndef(val, (val) => ({ t: "Select", vals: { [val]: 1 } })),
      })
    )
  }

  const nVals = active ? Object.keys(active?.vals).length : 0

  if (isCalculated && nVals > 1) return <MultiSelectView vals={active!.vals} />

  return (
    <Box position="relative">
      <Select
        value={f.mapUndef(active?.vals, primaryWeighted)}
        onChangeMaybe={set}
        variants={field.selectOptions}
        faded={isCalculated}
        split={overwritten === undefined ? 0.5 : 0.75}
      />
      {overwritten !== undefined && (
        <OverwrittenView
          val={primaryWeighted(overwritten.vals)}
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

function use_active_isCalculated_overwritten<T extends FieldVal>(
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

  const overwritten =
    explicit !== undefined && calculated !== undefined ? calculated : undefined

  const isCalculated = explicit === undefined && calculated !== undefined

  const active = explicit ?? calculated

  return [active, isCalculated, overwritten]
}
