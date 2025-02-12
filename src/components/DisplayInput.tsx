import TextField from "@mui/material/TextField"
import { FormControl } from "@mui/material"
import { Variant } from "@mui/material/styles/createTypography"

interface Props {
  value: string
  onChange: (newValue: string) => void
  variant?: Variant
  faded?: boolean
  split?: number
  padding?: number
  color?: string
}

export default function DisplayInput({
  value,
  onChange,
  variant = "body1",
  faded,
  split = 0.5,
  padding = 23,
  color,
}: Props) {
  return (
    <FormControl fullWidth>
      <TextField
        variant="standard"
        value={value}
        autoComplete="off"
        onChange={(e) => onChange(e.target.value)}
        sx={(theme) => ({
          input: {
            fontSize: theme.typography[variant].fontSize,
            fontWeight: theme.typography[variant].fontWeight,
            padding: theme.spacing(1),
          },
          // "& .MuiInput-underline:before": {
          //   borderBottom: "none", // Remove bottom underline (before focus)
          // },
          // "& .MuiInput-underline:after": {
          //   borderBottom: "none", // Remove bottom underline (after focus)
          // },
          color: theme.palette.text.disabled,
        })}
        slotProps={{
          input: {
            sx: {
              color: faded ? "text.secondary" : "text.primary",
              padding: 0,
            },
          },
          htmlInput: {
            style: {
              paddingTop: padding * split,
              paddingBottom: padding * (1 - split),
              color: color,
            },
          },
        }}
      />
    </FormControl>
  )
}
