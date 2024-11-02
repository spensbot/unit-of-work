import { Box, Typography } from "@mui/material"
import { SelectFieldVal, WeightedSelect } from "./FieldVal"

const BASE_REM = 0.7
const REM_RANGE = 0.4

function rem(ratio: number): string {
  return `${BASE_REM + ratio * REM_RANGE}rem`
}

export default function MultiSelectView({ vals }: { vals: WeightedSelect }) {
  const total = Object.values(vals).reduce((a, b) => a + b, 0)
  const sorted = Object.entries(vals).sort((a, b) => b[1] - a[1])

  return (
    <Box display="flex" flexDirection="column" position="relative" px={0.5}>
      {sorted.map(([key, val]) => {
        const ratio = val / total
        const percent = Math.floor(ratio * 100)
        return (
          <Box key={key} display="flex" gap={0.5} color="text.secondary">
            <Typography sx={{ fontSize: rem(ratio), padding: 0, margin: 0 }}>
              {percent}%
            </Typography>
            <Typography sx={{ fontSize: rem(ratio) }}>{key}</Typography>
          </Box>
        )
      })}
    </Box>
  )
}
