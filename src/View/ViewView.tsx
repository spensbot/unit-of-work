import styled from "@emotion/styled"
import { useActiveView } from "./View"
import TableView from "./TableView"
import KanbanView from "./KanbanView"
import MapView from "./MapView"
import { Box } from "@mui/material"
import ViewConfig from "./ViewConfig"
import { useActivePortfolio } from "../Portfolio/Portfolio"

export default function ActiveViewView() {
  return (
    <Root>
      <ViewConfig />
      <Box sx={{ padding: 2 }}>
        <ActiveViewTyped />
      </Box>
    </Root>
  )
}

const Root = styled.div`
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.palette.background.paper};
`

function ActiveViewTyped() {
  const viewMode = useActiveView((v) => v.mode)

  switch (viewMode) {
    case "table":
      return <TableView />
    case "kanban":
      return <KanbanView />
    case "map":
      return <MapView />
  }
}
