import styled from "@emotion/styled"
import { Box, Typography } from "@mui/material"
import ErrorTrigger from "../config/ErrorTrigger"

export default function Footer() {
  return (
    <Root>
      <Typography>Unit of Work. Copyright 2024</Typography>
      <Box flexGrow={1} />
      <ErrorTrigger />
    </Root>
  )
}

const Root = styled.div`
  display: flex;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(1)};
`
