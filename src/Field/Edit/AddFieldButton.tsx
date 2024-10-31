import AddIcon from "@mui/icons-material/Add"
import { IconButton } from "@mui/material"
import AddFieldView from "./AddFieldView"
import usePopover from "../../hooks/usePopover"

export default function AddFieldButton() {
  const [open, Popover] = usePopover()

  return (
    <>
      <IconButton onClick={open}>
        <AddIcon />
      </IconButton>
      <Popover>
        <AddFieldView close={close} />
      </Popover>
    </>
  )
}
