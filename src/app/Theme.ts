import { createTheme as muiCreateTheme, Theme as muiTheme } from "@mui/material/styles"

export interface Theme extends muiTheme {

}

export function createTheme(): Theme {
  const theme = muiCreateTheme()
  console.log("Spenser: " + theme.spacing(1))
  return muiCreateTheme()
}