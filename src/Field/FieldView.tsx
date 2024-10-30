import { Box } from "@mui/material"
import EditFieldButton from "./Edit/EditFieldButton"
import { useActivePortfolio } from "../Portfolio/Portfolio"
import { useHover } from "../hooks/useHover"
import PropogateUpIcon from "../icons/PropogateUpIcon"
import PropogateDownIcon from "../icons/PropogateDownIcon"
import PropogateIcon, { PropogateDir } from "../icons/PropogateIcon"

export default function FieldView({ guid }: { guid: string }) {
  const field = useActivePortfolio((p) => p.fieldsByGuid[guid])
  const [hoverRef, isHover] = useHover()

  const up = field.propogateUp !== undefined
  const down = field.propogateDown !== undefined
  const dir: PropogateDir =
    up && down ? "both" : up ? "up" : down ? "down" : undefined

  return (
    <Box ref={hoverRef} display="flex" alignItems="center" gap={1}>
      {field.name}
      <PropogateIcon dir={dir} />
      <Box flexGrow={1} />
      <EditFieldButton guid={guid} visible={!isHover} />
    </Box>
  )
}
