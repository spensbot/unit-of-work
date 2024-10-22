import styled from "@emotion/styled"
import { useActivePortfolio } from "../Portfolio/Portfolio"
import { useAppDispatch } from "../config/store"
import { addView, setActiveView } from "../Portfolio/portfolioSlice"
import { Box, IconButton } from "@mui/material"
import Add from "@mui/icons-material/Add"
import { useDispatch } from "react-redux"
import { newTableView } from "./View"

export default function ViewSelect() {
  const dispatch = useDispatch()
  const viewGuids = useActivePortfolio((p) => p.viewGuids)

  return (
    <Root>
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
    </Root>
  )
}

const Root = styled.div`
  display: flex;
`

function ViewSelectItem({ guid }: { guid: string }) {
  const activeViewGuid = useActivePortfolio((p) => p.activeViewGuid)
  const viewName = useActivePortfolio((p) => p.viewsByGuid[guid].name)
  const dispatch = useAppDispatch()

  const isActive = activeViewGuid === guid

  return (
    <ItemRoot
      isActive={isActive}
      onClick={() => dispatch(setActiveView({ guid: guid }))}
    >
      {viewName}
    </ItemRoot>
  )
}

const ItemRoot = styled.button<{ isActive: boolean }>`
  background-color: ${({ theme, isActive }) =>
    isActive
      ? theme.palette.background.paper
      : theme.palette.background.default};
  padding: ${({ theme }) => theme.spacing(0.5) + " " + theme.spacing(2)};
`
