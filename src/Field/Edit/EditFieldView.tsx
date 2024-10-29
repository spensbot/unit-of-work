import { Box, Button, Typography } from "@mui/material"
import { useAppDispatch } from "../../config/store"
import { addField, deleteField } from "../../Portfolio/portfolioSlice"

export default function EditFieldView({ guid }: { guid: string }) {
  const dispatch = useAppDispatch()

  const onDelete = () => {
    dispatch(deleteField({ guid }))
  }

  return (
    <Box padding={2} display="flex" flexDirection="column" gap={1}>
      <Typography variant="h5">Edit Field</Typography>
      <Button color="error" variant="contained" onClick={onDelete}>
        Delete Field
      </Button>
    </Box>
  )
}
