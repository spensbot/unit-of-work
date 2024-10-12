import { Button } from "@mui/material"
import { useAppDispatch } from "./store"
import { enterErrorState } from "../Portfolio/portfolioSlice"

export default function ErrorTrigger() {
  const dispatch = useAppDispatch()
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
