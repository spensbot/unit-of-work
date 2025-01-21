import { IconButton } from "@mui/material"
import SettingsIcon from "@mui/icons-material/Settings"
import AddViewConfigPopup from "./AddViewConfigPopup"
import usePopover from "../../hooks/usePopover"

export default function AddViewConfigButton() {
  // const [anchor, open, close, isOpen] = usePopover()
  const [open, Popover, close] = usePopover()

  return (
    <>
      <IconButton onClick={open}>
        <SettingsIcon />
      </IconButton>
      {/* <Button onClick={open}>View</Button> */}
      <Popover>
        <AddViewConfigPopup close={close} />
      </Popover>
    </>
  )
}
