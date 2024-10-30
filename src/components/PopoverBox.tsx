import { Box } from "@mui/material"

export default function PopoverBox({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <Box
      padding={2}
      display="flex"
      flexDirection="column"
      alignItems="stretch"
      gap={2}
      minWidth={300}
    >
      {children}
    </Box>
  )
}
