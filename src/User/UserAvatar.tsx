import styled from "@emotion/styled"
import { useActivePortfolio } from "../Portfolio/Portfolio"

interface Props {
  guid: string
}

export default function UserAvatar({ guid }: Props) {
  const user = useActivePortfolio((p) => p.usersByGuid[guid])

  return <StyledImage src={user.image_url} alt={user.username} />
}

const StyledImage = styled.img`
  width: ${(props) => props.theme.spacing(5)};
  height: ${(props) => props.theme.spacing(5)};
  border-radius: 50%; /* Rounds the edges */
  object-fit: cover; /* Ensures the image fills the area while maintaining aspect ratio */
  border: 1px solid ${(props) => props.theme.palette.divider};
`
