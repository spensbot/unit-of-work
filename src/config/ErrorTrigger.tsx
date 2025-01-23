import { Button } from "@mui/material"
import { useAppDispatch } from "./store"
import { enterErrorState } from "../Portfolio/portfolioSlice"
import isDebug from "../isDebug"

export default function ErrorTrigger() {
  const dispatch = useAppDispatch()

  if (!isDebug) return null

  return (
    <Button
      variant="contained"
      color="error"
      onClick={() => {
        dispatch(enterErrorState())
      }}
    >
      Force Error!
    </Button>
  )
}
