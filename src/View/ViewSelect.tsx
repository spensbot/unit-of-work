import { useActivePortfolio } from "../Portfolio/Portfolio"
import { useAppDispatch } from "../config/store"
import {
  addView,
  deleteView,
  setActiveView,
  setViewName,
} from "../Portfolio/portfolioSlice"
import { Box, IconButton } from "@mui/material"
import Add from "@mui/icons-material/Add"
import { useDispatch } from "react-redux"
import { newTableView } from "./View"
import DisplayInput from "../components/DisplayInput"
import DeleteIcon from "@mui/icons-material/Delete"
import { loadFromFile, saveToFile } from "../config/saveloadFile"
import SaveIcon from "@mui/icons-material/Save"
import LoadIcon from "@mui/icons-material/FileUpload"

export default function ViewSelect() {
  const dispatch = useDispatch()
  const viewGuids = useActivePortfolio((p) => p.viewGuids)

  return (
    <Box display="flex" alignItems="center" gap={1}>
      {viewGuids.map((guid) => (
        <ViewSelectItem key={guid} guid={guid} />
      ))}
      <IconButton onClick={() => dispatch(addView(newTableView("New View")))}>
        <Add />
      </IconButton>
      <Box
        flex={1}
        sx={{
          backgroundColor: "background.default",
        }}
      />
      <SaveButton />
      <LoadButton />
    </Box>
  )
}

function ViewSelectItem({ guid }: { guid: string }) {
  const activeViewGuid = useActivePortfolio((p) => p.activeViewGuid)
  const viewName = useActivePortfolio((p) => p.viewsByGuid[guid].name)
  const dispatch = useAppDispatch()

  const isSolo = useActivePortfolio((p) => p.viewGuids.length === 1)
  const isActive = activeViewGuid === guid

  return (
    <Box
      bgcolor={isActive ? "background.paper" : "background.default"}
      sx={{ px: 1, py: 0.2, cursor: isActive ? undefined : "pointer" }}
      onClick={() => dispatch(setActiveView({ guid: guid }))}
      display="flex"
      alignItems="center"
    >
      {isActive ? (
        <>
          <DisplayInput
            value={viewName}
            onChange={(name) => dispatch(setViewName({ guid, name }))}
          />
          {!isSolo && (
            <IconButton onClick={() => dispatch(deleteView({ guid }))}>
              <DeleteIcon />
            </IconButton>
          )}
        </>
      ) : (
        viewName
      )}
    </Box>
  )
}

function SaveButton() {
  return (
    <IconButton onClick={saveToFile}>
      <SaveIcon />
    </IconButton>
  )
}

function LoadButton() {
  return (
    <IconButton onClick={loadFromFile}>
      <LoadIcon />
    </IconButton>
  )
}
