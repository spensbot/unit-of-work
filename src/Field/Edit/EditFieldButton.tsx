import EditIcon from "@mui/icons-material/Edit"
import { IconButton, Popover } from "@mui/material"
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
  const [anchor, open, close, isOpen] = usePopover()

  return (
    <>
      <IconButton
        onClick={open}
        sx={{ visibility: visible ? "hidden" : undefined }}
      >
        <EditIcon />
      </IconButton>
      <Popover
        open={isOpen}
        anchorEl={anchor}
        onClose={close}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
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
