import {
  Box,
  createTheme,
  Slider,
  TextField,
  ThemeProvider,
} from "@mui/material"
import { useAppDispatch } from "../config/store"
import getMaxDepth from "../Portfolio/getMaxDepth"
import { useActivePortfolio } from "../Portfolio/Portfolio"
import { useActiveView } from "./View"
import { setDepth, setLevelName } from "../Portfolio/portfolioSlice"
import { flip } from "../util/math"
import DisplayInput from "../components/DisplayInput"
import { range1 } from "../util/functional"

export default function HierarchyView() {
  const maxDepth = useActivePortfolio((p) => getMaxDepth(p))
  const dispatch = useAppDispatch()
  const depth = useActiveView((v) => v.depth)

  if (maxDepth < 2) {
    return null
  }

  const depthDim = 30 * (maxDepth - 1)

  return (
    <Box display="flex">
      <Box height={depthDim} marginX={2} marginY={2}>
        <Slider
          // value={lerp(maxDepth, 1, unlerp(1, maxDepth, depth))}
          value={flip(1, maxDepth, depth)}
          orientation="vertical"
          onChange={(_, newValue) => {
            if (!Array.isArray(newValue)) {
              dispatch(setDepth(flip(1, maxDepth, newValue)))
            }
          }}
          // valueLabelDisplay="auto"
          min={1}
          max={maxDepth}
          step={1}
          marks
          sx={{ color: "#0005" }}
        />
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        width={"7rem"}
      >
        {range1(Math.min(maxDepth)).map((i) => (
          <LevelName key={i} i={i} />
        ))}
      </Box>
    </Box>
  )
}

function LevelName({ i }: { i: number }) {
  const level = useActivePortfolio((p) => p.levelNames[i])
  const dispatch = useAppDispatch()

  const activeDepth = useActiveView((v) => v.depth)

  const isActive = i === activeDepth - 1

  return (
    <DisplayInput
      value={level}
      onChange={(newName) => dispatch(setLevelName({ i, newName }))}
      padding={5}
      color={isActive ? "#99f" : "#777"}
    />
  )
}
