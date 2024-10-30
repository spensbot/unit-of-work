import { useState } from "react"

export default function usePopover() {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null)

  const open = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(event.currentTarget)
  }

  const close = () => {
    setAnchor(null)
  }

  const isOpen = Boolean(anchor)

  return [anchor, open, close, isOpen] as const
}