import { Button } from "@mui/material"
import AddViewConfigPopup from "./AddViewConfigPopup"
import usePopover from "../../hooks/usePopover"

export default function AddViewConfigButton() {
  // const [anchor, open, close, isOpen] = usePopover()
  const [open, Popover, close] = usePopover()

  return (
    <>
      <Button onClick={open}>View</Button>
      <Popover>
        <AddViewConfigPopup close={close} />
      </Popover>
    </>
  )
}
