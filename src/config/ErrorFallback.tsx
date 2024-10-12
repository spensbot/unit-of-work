import styled from "@emotion/styled"
import { Button } from "@mui/material"
import { resetState, useAppDispatch } from "./store"
import { newPortfolio } from "../Portfolio/Portfolio"
import { FallbackProps } from "react-error-boundary"

export default function ErrorFallback({
  error,
  resetErrorBoundary,
}: FallbackProps) {
  const dispatch = useAppDispatch()
  return (
    <Root>
      <h1>Something went wrong</h1>
      <p>You can try refreshing. If that doesn't work you may have to:</p>
      <Button
        variant="contained"
        onClick={() => {
          dispatch(
            resetState({
              portfolio: newPortfolio(),
            })
          )
          resetErrorBoundary()
        }}
      >
        Reset State
      </Button>
    </Root>
  )
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`
