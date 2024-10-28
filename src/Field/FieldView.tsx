import { Box } from "@mui/material"
import EditFieldButton from "./EditFieldButton"
import { useActivePortfolio } from "../Portfolio/Portfolio"
import { useHover } from "../hooks/useHover"

export default function FieldView({ guid }: { guid: string }) {
  const field = useActivePortfolio((p) => p.fieldsByGuid[guid])
  const [hoverRef, isHover] = useHover()

  return (
    <Box
      ref={hoverRef}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      {field.name}
      <EditFieldButton guid={guid} visible={!isHover} />
    </Box>
  )
}
