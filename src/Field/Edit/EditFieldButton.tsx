import EditIcon from "@mui/icons-material/Edit"
import { IconButton } from "@mui/material"
import EditFieldView from "./EditFieldView"
import { useActivePortfolio } from "../../Portfolio/Portfolio"
import { useAppDispatch } from "../../config/store"
import { setField } from "../../Portfolio/portfolioSlice"
import usePopover from "../../hooks/usePopover"

interface Props {
  visible: boolean
  guid: string
}

export default function EditFieldButton({ guid, visible }: Props) {
  const field = useActivePortfolio((p) => p.fieldsByGuid[guid])
  const dispatch = useAppDispatch()
  const [open, Popover] = usePopover()

  if (!field) return null

  return (
    <>
      <IconButton
        onClick={open}
        sx={{ visibility: visible ? "hidden" : undefined }}
      >
        <EditIcon />
      </IconButton>
      <Popover>
        <EditFieldView
          field={field}
          setField={(newField) => {
            dispatch(setField(newField))
          }}
        />
      </Popover>
    </>
  )
}
