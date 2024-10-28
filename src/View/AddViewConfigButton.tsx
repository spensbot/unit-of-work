import AddIcon from "@mui/icons-material/Add"
import { Button, IconButton, Popover } from "@mui/material"
import { useState } from "react"
import AddViewConfigPopup from "./AddViewConfigPopup"

export default function AddViewConfigButton() {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  return (
    <>
      <Button onClick={handleClick}>Configure View</Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <AddViewConfigPopup close={handleClose} />
      </Popover>
    </>
  )
}
