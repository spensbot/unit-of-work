import { Global, css } from "@emotion/react"

export default function GlobalStyle() {
  return <Global styles={globalCss} />
}

const globalCss = css`
  body {
    margin: 0;
  }

  button,
  input[type="submit"],
  input[type="reset"] {
    background: none;
    color: inherit;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
  }
`
