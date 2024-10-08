import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
} from "@mui/material"

interface Props {
  value?: string
  onChange: (newValue: string) => void
  variants: string[]
  label?: string
  id?: string
}

export default function Select({
  value,
  onChange,
  variants,
  label,
  id = "Select",
}: Props) {
  const labelId = `${id}-label`

  let selectVariants = [...variants, undefined]

  return (
    <FormControl fullWidth>
      {label && <InputLabel id={labelId}>{label}</InputLabel>}
      <MuiSelect
        labelId={labelId}
        id={id}
        value={value}
        label={label}
        onChange={(e) => onChange(e.target.value as string)}
      >
        {selectVariants.map((variant) => {
          return (
            <MenuItem key={variant ?? "None"} value={variant}>
              {variant ?? "None"}
            </MenuItem>
          )
        })}
      </MuiSelect>
    </FormControl>
  )
}
