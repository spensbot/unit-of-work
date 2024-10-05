import styled from "@emotion/styled"
import { useActiveView } from "./View"
import TableView from "./TableView"
import KanbanView from "./KanbanView"
import MapView from "./MapView"

export default function ActiveViewView() {
  // const activeView = useActivePortfolio((p) => p.activeView)
  // activeView.

  return (
    <Root>
      <ActiveViewTyped />
    </Root>
  )
}

function ActiveViewTyped() {
  const view = useActiveView((v) => v)

  switch (view.t) {
    case "table":
      return <TableView />
    case "kanban":
      return <KanbanView />
    case "map":
      return <MapView />
  }
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
`
