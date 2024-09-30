import styled from "@emotion/styled"
import { Typography } from "@mui/material"

export default function Footer() {
  return (
    <Root>
      <Typography>Unit of Work. Copyright 2024</Typography>
    </Root>
  )
}

const Root = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(2)};
`
