import { IconButton } from "@mui/material"
import { deleteUnit } from "../Portfolio/portfolioSlice"
import Delete from "@mui/icons-material/Delete"
import { useAppDispatch } from "../config/store"

export default function DeleteUnitButton({ guid }: { guid: string }) {
  const dispatch = useAppDispatch()

  return (
    <IconButton onClick={() => dispatch(deleteUnit({ guid }))}>
      <Delete />
    </IconButton>
  )
}
