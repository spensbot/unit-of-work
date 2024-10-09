import styled from "@emotion/styled"
import { useActiveView } from "./View"
import TableView from "./TableView"
import KanbanView from "./KanbanView"
import MapView from "./MapView"
import ViewSelect from "./ViewSelect"
import { Box } from "@mui/material"
import ViewConfig from "./ViewConfig"

export default function ActiveViewView() {
  return (
    <Root>
      <ViewSelect />
      <ViewConfig />
      <Box sx={{ padding: 2 }}>
        <ActiveViewTyped />
      </Box>
    </Root>
  )
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.palette.background.paper};
`

function ActiveViewTyped() {
  const view = useActiveView((v) => v)

  switch (view.mode) {
    case "table":
      return <TableView />
    case "kanban":
      return <KanbanView />
    case "map":
      return <MapView />
  }
}
