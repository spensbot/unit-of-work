import PropogateBothIcon from "./PropogateBothIcon"
import PropogateDownIcon from "./PropogateDownIcon"
import PropogateUpIcon from "./PropogateUpIcon"

export type PropogateDir = "up" | "down" | "both"

export default function PropogateIcon({ dir }: { dir?: PropogateDir }) {
  switch (dir) {
    case "up":
      return <PropogateUpIcon />
    case "down":
      return <PropogateDownIcon />
    case "both":
      return <PropogateBothIcon />
    default:
      return null
  }
}
