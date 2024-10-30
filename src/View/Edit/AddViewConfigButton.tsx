import { Button, Popover } from "@mui/material"
import AddViewConfigPopup from "./AddViewConfigPopup"
import usePopover from "../../hooks/usePopover"

export default function AddViewConfigButton() {
  const [anchor, open, close, isOpen] = usePopover()

  return (
    <>
      <Button onClick={open}>Configure View</Button>
      <Popover
        open={isOpen}
        anchorEl={anchor}
        onClose={close}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <AddViewConfigPopup close={close} />
      </Popover>
    </>
  )
}
