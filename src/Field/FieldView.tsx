import { Box, IconButton } from "@mui/material"
import EditFieldButton from "./Edit/EditFieldButton"
import { useActivePortfolio } from "../Portfolio/Portfolio"
import { useHover } from "../hooks/useHover"
import PropogateIcon, { PropogateDir } from "../icons/PropogateIcon"
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward"
import { useAppDispatch } from "../config/store"
import { applyFieldToChildren } from "../Portfolio/portfolioSlice"
import { Field } from "./Field"
import Deleted from "../components/Deleted"

export default function FieldView({ guid }: { guid: string }) {
  const field = useActivePortfolio((p) => p.fieldsByGuid[guid])
  const [hoverRef, isHover] = useHover()

  if (!field) return <Deleted />

  const propogateDir = getPropogateDir(field)

  return (
    <Box ref={hoverRef} display="flex" alignItems="center" gap={1}>
      {field.name}
      <PropogateIcon dir={propogateDir} />
      <Box flexGrow={1} />
      <EditFieldButton guid={guid} visible={!isHover} />
    </Box>
  )
}

export function ActiveUnitFieldView({
  unitGuid,
  fieldGuid,
}: {
  unitGuid: string
  fieldGuid: string
}) {
  const dispatch = useAppDispatch()
  const field = useActivePortfolio((p) => p.fieldsByGuid[fieldGuid])
  const unit = useActivePortfolio((p) => p.unitsByGuid[unitGuid])
  const fieldVal = unit.fieldValsByGuid[fieldGuid]

  if (!field) return <Deleted />

  const propogateDir = getPropogateDir(field)

  const canApplyToChildren =
    field.propogateDown === "Inherit" &&
    unit.childrenGuids.length > 0 &&
    fieldVal !== undefined

  return (
    <Box display="flex" alignItems="center" gap={1}>
      {field.name}
      <PropogateIcon dir={propogateDir} />
      <Box flexGrow={1} />
      {canApplyToChildren && (
        <IconButton
          onClick={() =>
            dispatch(applyFieldToChildren({ unitGuid, fieldGuid: field.guid }))
          }
        >
          <ArrowDownwardIcon />
        </IconButton>
      )}
    </Box>
  )
}

function getPropogateDir(field: Field): PropogateDir | undefined {
  const up = field.propogateUp !== undefined
  const down = field.propogateDown !== undefined
  return up && down ? "both" : up ? "up" : down ? "down" : undefined
}
