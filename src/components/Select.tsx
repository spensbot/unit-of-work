import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
} from "@mui/material"

// I don't love this, but can't think of something better since undefined and null don't work with MUI
const NULL_ITEM_VALUE = ""
const NULL_ITEM_DISPLAY = "---"

interface Props<T> {
  value?: T
  onChangeMaybe?: (newValue?: T) => void
  onChange?: (newValue: T) => void
  variants: readonly T[]
  displays?: string[]
  label?: string
  id?: string
  faded?: boolean
  split?: number
}

export default function Select<T extends string>({
  value,
  onChangeMaybe,
  onChange,
  variants,
  displays,
  label,
  id = "Select",
  faded,
  split = 0.5,
}: Props<T>) {
  const isMaybe = onChangeMaybe !== undefined
  const _onChange = onChangeMaybe ?? onChange

  const labelId = `${id}-label`

  if (displays !== undefined) {
    if (variants.length !== displays.length) {
      console.error("Select Variants and displays must be the same length")
    }
  }

  const _value = value ?? NULL_ITEM_VALUE
  const _variants = isMaybe ? [...variants, NULL_ITEM_VALUE] : [...variants]
  const _displays = [...(displays ?? variants), NULL_ITEM_DISPLAY]

  return (
    <FormControl fullWidth>
      {label && <InputLabel id={labelId}>{label}</InputLabel>}
      <MuiSelect
        size="small"
        labelId={labelId}
        id={id}
        value={isMaybe ? _value : _value}
        label={label}
        onChange={(e) => {
          const updated = (
            e.target.value === NULL_ITEM_VALUE ? undefined : e.target.value
          ) as T | undefined
          if (_onChange !== undefined) _onChange(updated as T)
        }}
        sx={{
          color: faded ? "text.disabled" : "inherit",
        }}
        slotProps={{
          input: {
            sx: {
              paddingTop: TOTAL_PAD * split,
              paddingBottom: TOTAL_PAD * (1 - split),
            },
          },
        }}
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

const TOTAL_PAD = 3
