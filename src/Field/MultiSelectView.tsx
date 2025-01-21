import { Box, Typography } from "@mui/material"
import { SelectFieldVal, WeightedSelect } from "./FieldVal"
import { zip } from "../util/functional"

const BASE_REM = 0.7
const REM_RANGE = 0.4

function rem(ratio: number): string {
  return `${BASE_REM + ratio * REM_RANGE}rem`
}

export function MultiSelectView({ vals }: { vals: WeightedSelect }) {
  const total = Object.values(vals).reduce((a, b) => a + b, 0)
  const sorted = Object.entries(vals).sort((a, b) => b[1] - a[1])

  if (Object.keys(vals).length === 0) {
    return null
  }

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

const bgColors: string[] = ["#8f8", "#88f", "#ff8", "#8ff"]

export default function MultiSelectView2({ vals }: { vals: WeightedSelect }) {
  const total = Object.values(vals).reduce((a, b) => a + b, 0)
  const sorted = Object.entries(vals).sort((a, b) => b[1] - a[1])

  if (Object.keys(vals).length === 0) {
    return null
  }

  return (
    <Box
      display="flex"
      px={0.5}
      borderRadius={"0.5rem"}
      overflow="hidden"
      padding={0}
    >
      {zip(bgColors, sorted).map(([color, [key, val]], i) => {
        const ratio = val / total
        const percent = Math.floor(ratio * 100)
        return (
          <Typography
            key={key}
            color={"#000"}
            fontSize={rem(ratio)}
            bgcolor={color}
            flex={percent}
            overflow={"hidden"}
            whiteSpace={"nowrap"}
            display={"flex"}
            flexDirection={"row"}
            alignItems={"center"}
            padding={0.5}
          >
            {key} {i === 0 ? ` ${percent}%` : null}
          </Typography>
        )
      })}
    </Box>
  )
}
