import { Box, Button } from "@mui/material"
import { useState } from "react"
import {
  DateField,
  Field,
  GroupStrategy,
  NumberField,
  PropogateDownStrategy,
  ReduceStrategy,
  SelectField,
  UserField,
} from "../Field"
import Select from "../../components/Select"
import DisplayInput from "../../components/DisplayInput"
import { useActivePortfolio } from "../../Portfolio/Portfolio"
import PropogateUpIcon from "../../icons/PropogateUpIcon"
import PropogateDownIcon from "../../icons/PropogateDownIcon"
import CalcNodeView from "../CalculatedField/CalcNodeView"
import FieldTypeSelect from "./FieldTypeSelect"

type FieldEditMode = "Edit" | "Create"

export default function FieldEditor({
  field,
  setField,
  mode,
}: {
  field: Field
  setField: (field: Field) => void
  mode: FieldEditMode
}) {
  const setName = (name: string) => setField({ ...field, name })
  const setPropogateDown = (propogateDown?: PropogateDownStrategy) =>
    setField({ ...field, propogateDown })
  const setT = (t: Field["t"]) => {
    const { guid, name, propogateDown } = field
    if (t === "SelectField") {
      setField({ t, guid, name, propogateDown, selectOptions: [] })
    } else if (t === "CalculatedField") {
      setField({
        t,
        guid,
        name,
        node: {
          t: "BinaryOp",
          op: "+",
          left: { t: "NumberSource" },
          right: { t: "NumberSource" },
        },
      })
    } else {
      setField({ t, guid, name, propogateDown })
    }
  }

  const canPropogate = field.t !== "CalculatedField"

  return (
    <>
      {mode === "Create" && <FieldTypeSelect t={field.t} setT={setT} />}
      <DisplayInput value={field.name} onChange={setName} />
      {(field.t === "UserField" || field.t === "SelectField") && (
        <GroupStrategyView field={field} setField={setField} />
      )}
      {(field.t === "NumberField" || field.t === "DateField") && (
        <ReduceStrategyView field={field} setField={setField} />
      )}
      {canPropogate && (
        <Box display="flex" alignItems="center">
          <PropogateDownIcon />
          <Select
            label="Propogate Down"
            value={field.propogateDown}
            onChangeMaybe={setPropogateDown}
            variants={["Inherit"]}
          />
        </Box>
      )}
      {field.t === "SelectField" && mode === "Create" && (
        <SelectOptions field={field} setField={setField} />
      )}

      {field.t === "CalculatedField" && (
        <CalcNodeView
          node={field.node}
          onChange={(node) => setField({ ...field, node })}
        />
      )}
    </>
  )
}

interface SubProps<T> {
  field: T
  setField: (field: Field) => void
}

function SelectOptions({ field, setField }: SubProps<SelectField>) {
  const [newOption, setNewOption] = useState("")

  const addOption = () => {
    if (!field.selectOptions.includes(newOption)) {
      setField({ ...field, selectOptions: [...field.selectOptions, newOption] })
    }
  }

  return (
    <Box>
      {field.selectOptions.map((option) => (
        <Box key={option}>{option}</Box>
      ))}
      <Box display="flex">
        <DisplayInput value={newOption} onChange={setNewOption} />
        <Button disabled={newOption.length === 0} onClick={addOption}>
          Add
        </Button>
      </Box>
    </Box>
  )
}

function GroupStrategyView({
  field,
  setField,
}: SubProps<SelectField | UserField>) {
  const BY_TASK = "task"
  const fieldGuids = useActivePortfolio((p) => p.fieldGuids)
  const fieldsByGuid = useActivePortfolio((p) => p.fieldsByGuid)

  const weightFields = fieldGuids
    .map((guid) => fieldsByGuid[guid])
    .filter((f) => f !== undefined)
    .filter((f) => f.t === "NumberField")
  const weightFieldGuids = weightFields.map((f) => f.guid)
  const displays = weightFields.map((f) => f.name)

  const setWeightFieldGuid = (weightFieldGuid?: string) => {
    const propogateUp =
      weightFieldGuid === undefined
        ? undefined
        : ({
            t: "Group",
            weightFieldGuid:
              weightFieldGuid === BY_TASK ? undefined : weightFieldGuid,
          } as GroupStrategy)

    setField({
      ...field,
      propogateUp,
    })
  }

  const weightField = field.propogateUp?.weightFieldGuid

  return (
    <Box display="flex" alignItems="center">
      <PropogateUpIcon />
      <Select
        label="Propogate Up Weighted By"
        value={field.propogateUp ? weightField ?? BY_TASK : undefined}
        onChangeMaybe={setWeightFieldGuid}
        variants={[...weightFieldGuids, BY_TASK]}
        displays={[...displays, "Task"]}
      />
    </Box>
  )
}

function ReduceStrategyView({
  field,
  setField,
}: SubProps<NumberField | DateField>) {
  const set = (func?: ReduceStrategy["func"]) => {
    const propogateUp: ReduceStrategy | undefined = func && {
      t: "Reduce",
      func,
    }

    setField({ ...field, propogateUp })
  }

  return (
    <Box display="flex" alignItems="center">
      <PropogateUpIcon />
      <Select
        label="Propogate Up"
        value={field.propogateUp?.func}
        onChangeMaybe={set}
        variants={["Sum", "Max", "Min"]}
      />
    </Box>
  )
}
