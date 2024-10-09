import styled from "@emotion/styled"
import { useActivePortfolio } from "../Portfolio/Portfolio"
import { Box } from "@mui/material"

interface Props {
  guid: string
}

const SIZE = "2rem"

export default function UserAvatar({ guid }: Props) {
  const user = useActivePortfolio((p) => p.usersByGuid[guid])

  return (
    <>
      <Box sx={{ width: SIZE }} />
      <StyledImage src={user.image_url} alt={user.username} />
    </>
  )
}

const StyledImage = styled.img`
  width: ${SIZE};
  height: ${SIZE};
  border-radius: 50%; /* Rounds the edges */
  object-fit: cover; /* Ensures the image fills the area while maintaining aspect ratio */
  border: 1px solid ${(props) => props.theme.palette.divider};

  position: absolute;
`
