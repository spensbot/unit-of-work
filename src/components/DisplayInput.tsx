import TextField from "@mui/material/TextField"
import { FormControl } from "@mui/material"
import { Variant } from "@mui/material/styles/createTypography"

interface Props {
  value: string
  onChange: (newValue: string) => void
  variant?: Variant
}

export default function DisplayInput({
  value,
  onChange,
  variant = "body1",
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
          "& .MuiInput-underline:before": {
            borderBottom: "none", // Remove bottom underline (before focus)
          },
          "& .MuiInput-underline:after": {
            borderBottom: "none", // Remove bottom underline (after focus)
          },
        })}
      />
    </FormControl>
  )
}
