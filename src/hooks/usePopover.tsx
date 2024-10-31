import { Popover } from "@mui/material"
import { useState } from "react"

type Open = (event: React.MouseEvent<HTMLElement>) => void

interface Props {
  children: React.ReactNode
}

export default function usePopover(): [Open, React.FC<Props>] {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null)

  const open = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(event.currentTarget)
  }

  const close = () => {
    setAnchor(null)
  }

  const isOpen = Boolean(anchor)

  const container = ({ children }: Props) => {
    return (
      <Popover
        open={isOpen}
        anchorEl={anchor}
        onClose={close}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        {children}
      </Popover>
    )
  }

  return [open, container]
}
