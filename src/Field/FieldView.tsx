import { Box } from "@mui/material"
import EditFieldButton from "./EditFieldButton"
import { useActivePortfolio } from "../Portfolio/Portfolio"
import { useHover } from "../hooks/useHover"

export default function FieldView({ guid }: { guid: string }) {
  const field = useActivePortfolio((p) => p.fieldsByGuid[guid])
  const [hoverRef, isHover] = useHover()

  const up = field.propogateUp !== undefined
  const down = field.propogateDown !== undefined

  return (
    <Box ref={hoverRef} display="flex" alignItems="center" gap={1}>
      {field.name}
      <div>{up && "↑"}</div>
      <div>{down && "↓"}</div>
      <Box flexGrow={1} />
      <EditFieldButton guid={guid} visible={!isHover} />
    </Box>
  )
}
