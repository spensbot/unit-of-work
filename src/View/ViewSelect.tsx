import styled from "@emotion/styled"
import { useActivePortfolio } from "../Portfolio/Portfolio"
import { useAppDispatch } from "../config/store"
import { setActiveView } from "../Portfolio/portfolioSlice"
import { Box } from "@mui/material"

export default function ViewSelect() {
  const viewGuids = useActivePortfolio((p) => p.viewGuids)

  return (
    <Root>
      {viewGuids.map((guid) => (
        <ViewSelectItem key={guid} guid={guid} />
      ))}
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

  return (
    <ItemRoot
      isActive={guid === activeViewGuid}
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
