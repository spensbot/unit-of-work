import styled from "@emotion/styled"
import { useActivePortfolio } from "../Portfolio/Portfolio"
import { Box } from "@mui/material"
import UserAvatar from "./UserAvatar"

interface Props {
  guid: string
}

export default function UserView({ guid }: Props) {
  const user = useActivePortfolio((p) => p.usersByGuid[guid])

  return (
    <Root>
      <UserAvatar guid={guid} />
      <Box sx={{ width: "1rem", flexGrow: 0 }} />
      {user.username}
    </Root>
  )
}

const Root = styled.div`
  display: flex;
  align-items: center;
`
