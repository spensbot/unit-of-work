import { Box, Button, IconButton } from "@mui/material"
import { useAppDispatch } from "../config/store"
import { useActivePortfolio } from "../Portfolio/Portfolio"
import { moveUnit, setMoveUnit } from "../Portfolio/portfolioSlice"
import AltRouteIcon from "@mui/icons-material/AltRoute"
import EscalatorWarningIcon from "@mui/icons-material/EscalatorWarning"
import CancelIcon from "@mui/icons-material/Cancel"

function MoveUnitButtons({ guid }: { guid: string }) {
  const activeMoveUnit = useActivePortfolio((p) => p.moveUnitGuid)
  const dispatch = useAppDispatch()

  if (activeMoveUnit)
    return (
      <Box alignSelf={"flex-start"}>
        {activeMoveUnit !== guid && (
          <Button
            onClick={() =>
              dispatch(moveUnit({ guid: activeMoveUnit, parentGuid: guid }))
            }
          >
            Set New Parent
          </Button>
        )}
        <Button color="warning" onClick={() => dispatch(setMoveUnit({}))}>
          Cancel Parent Change
        </Button>
      </Box>
    )

  return (
    <Button
      variant="contained"
      sx={{ alignSelf: "flex-start" }}
      onClick={() => {
        dispatch(setMoveUnit({ guid }))
      }}
    >
      Change Parent
    </Button>
  )
}

export default function MoveUnitButtonsIcons({ guid }: { guid: string }) {
  const activeMoveUnit = useActivePortfolio((p) => p.moveUnitGuid)
  const dispatch = useAppDispatch()

  if (activeMoveUnit)
    return (
      <Box>
        {activeMoveUnit !== guid && (
          <IconButton
            color="primary"
            onClick={() =>
              dispatch(moveUnit({ guid: activeMoveUnit, parentGuid: guid }))
            }
          >
            <EscalatorWarningIcon />
          </IconButton>
        )}
        <IconButton color="warning" onClick={() => dispatch(setMoveUnit({}))}>
          <CancelIcon />
        </IconButton>
      </Box>
    )

  return (
    <IconButton
      onClick={() => {
        dispatch(setMoveUnit({ guid }))
      }}
    >
      <AltRouteIcon />
    </IconButton>
  )
}
