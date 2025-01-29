import { Box } from "@mui/material"
import { BinaryOp, CalcNode, NumberSource } from "./CalcNode"
import { Portfolio, useActivePortfolio } from "../../Portfolio/Portfolio"
import { createSelector } from "@reduxjs/toolkit"
import Select from "../../components/Select"
import { Log } from "../../util/Log"

interface Props<Node> {
  node: Node
  onChange: (node: CalcNode) => void
}

export default function CalcNodeView({
  node,
  onChange,
}: Props<CalcNode | undefined>) {
  if (node === undefined) return null

  switch (node.t) {
    case "NumberSource":
      return NumberSourceView({ node, onChange })
    case "BinaryOp":
      return BinaryOpView({ node, onChange })
    default:
      Log.Error("Unknown CalcNode type")
      return null
  }
}

function BinaryOpView({ node, onChange }: Props<BinaryOp>) {
  return (
    <Box display="flex" alignItems="center">
      <CalcNodeView
        node={node.left}
        onChange={(left) => onChange({ ...node, left })}
      />
      <Select
        value={node.op}
        variants={["+", "-", "*", "/"]}
        onChange={(op) => onChange({ ...node, op })}
      />
      <CalcNodeView
        node={node.right}
        onChange={(right) => onChange({ ...node, right })}
      />
    </Box>
  )
}

function NumberSourceView({ node, onChange }: Props<NumberSource>) {
  const numberFields = useActivePortfolio(selectNumberFields)

  const guid = node.guid

  const OPERATION = "OPERATION"
  const variants = numberFields.map((f) => f.guid)
  variants.push(OPERATION)
  const displays = numberFields.map((f) => f.name)
  displays.push("Sub Operation")

  const onVariantChange = (guid: string) => {
    onChange({ ...node, guid })
  }

  return (
    <Select
      value={guid}
      variants={variants}
      displays={displays}
      onChange={onVariantChange}
    />
  )
}

const selectNumberFields = createSelector(
  [(p: Portfolio) => p.fieldGuids, (p: Portfolio) => p.fieldsByGuid],
  (fieldGuids, fieldsByGuid) =>
    fieldGuids
      .map((guid) => fieldsByGuid[guid])
      .filter((f) => f !== undefined)
      .filter((f) => f.t === "NumberField")
)
