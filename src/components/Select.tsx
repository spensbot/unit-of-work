import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
} from "@mui/material"

interface Props {
  value: string
  onChange: (newValue: string) => void
  variants: string[]
  label?: string
}

export default function Select({ value, onChange, variants, label }: Props) {
  return (
    <FormControl fullWidth>
      {label && <InputLabel id="demo-simple-select-label">{label}</InputLabel>}
      <MuiSelect
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label={label}
        onChange={(e) => onChange(e.target.value as string)}
      >
        {variants.map((variant) => (
          <MenuItem key={variant} value={variant}>
            {variant}
          </MenuItem>
        ))}
      </MuiSelect>
    </FormControl>
  )
}
