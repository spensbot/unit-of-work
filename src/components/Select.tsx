import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
} from "@mui/material"

// I don't love this, but can't think of something better since undefined and null don't work with MUI
const NULL_ITEM_VALUE = 0
const NULL_ITEM_DISPLAY = "--"

interface Props {
  value?: string
  onChange: (newValue?: string) => void
  variants: string[]
  displays?: string[]
  label?: string
  id?: string
}

export default function Select({
  value,
  onChange,
  variants,
  displays,
  label,
  id = "Select",
}: Props) {
  const labelId = `${id}-label`

  if (displays !== undefined) {
    if (variants.length !== displays.length) {
      console.error("Select Variants and displays must be the same length")
    }
  }

  const _value = value ?? NULL_ITEM_VALUE
  const _variants: (string | 0)[] = [...variants, NULL_ITEM_VALUE]
  const _displays: (string | 0)[] = [
    ...(displays ?? variants),
    NULL_ITEM_DISPLAY,
  ]

  return (
    <FormControl fullWidth>
      {label && <InputLabel id={labelId}>{label}</InputLabel>}
      <MuiSelect
        size="small"
        labelId={labelId}
        id={id}
        value={_value}
        label={label}
        onChange={(e) => onChange(e.target.value as string)}
      >
        {_variants.map((variant) => {
          return (
            <MenuItem key={variant} value={variant}>
              {_displays[_variants.indexOf(variant)]}
            </MenuItem>
          )
        })}
      </MuiSelect>
    </FormControl>
  )
}
