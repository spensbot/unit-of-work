import EditIcon from "@mui/icons-material/Edit"
import { IconButton, Popover } from "@mui/material"
import { useState } from "react"
import EditFieldView from "./EditFieldView"

interface Props {
  visible: boolean
  guid: string
}

export default function EditFieldButton({ guid, visible }: Props) {
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
      <IconButton
        onClick={handleClick}
        sx={{ visibility: visible ? "hidden" : undefined }}
      >
        <EditIcon />
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <EditFieldView guid={guid} />
      </Popover>
    </>
  )
}
