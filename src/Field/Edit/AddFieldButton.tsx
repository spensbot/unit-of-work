import AddIcon from "@mui/icons-material/Add"
import { IconButton, Popover } from "@mui/material"
import AddFieldView from "./AddFieldView"
import usePopover from "../../hooks/usePopover"

export default function AddFieldButton() {
  const [anchor, open, close, isOpen] = usePopover()

  return (
    <>
      <IconButton onClick={open}>
        <AddIcon />
      </IconButton>
      <Popover
        open={isOpen}
        anchorEl={anchor}
        onClose={close}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <AddFieldView close={close} />
      </Popover>
    </>
  )
}
