import { Box } from "@mui/material"
import { useActivePortfolio } from "../Portfolio/Portfolio"
import { getUnitDepth } from "@/Portfolio/getMaxDepth"

export default function UnitDepth({ guid }: { guid: string }) {
  const depth = useActivePortfolio((p) => getUnitDepth(guid, p))

  return (
    <Box display="flex" gap="0.2rem">
      {Array.from({ length: depth + 1 }).map((_, i) => (
        <DepthIcon key={i} />
      ))}
    </Box>
  )
}

function DepthIcon() {
  const size = "0.8rem"
  return (
    // <Box bgcolor={"purple"} width={size} height={size} borderRadius={size} />
    <Box
      bgcolor={"purple"}
      width={"0.3rem"}
      height={"1rem"}
      borderRadius={size}
    />
  )
}
