import { Global, css } from "@emotion/react"

export default function GlobalStyle() {
  return <Global styles={globalCss} />
}

const globalCss = css`
  body {
    margin: 0;
  }
`
