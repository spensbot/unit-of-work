import { ToggleButton, ToggleButtonGroup } from "@mui/material"

interface Props<T> {
  value: T
  onChange: (newValue: T) => void
  variants: readonly T[]
  displays?: string[]
}

export default function SelectGroup<T extends string>({
  value,
  onChange,
  variants,
  displays,
}: Props<T>) {
  const _displays = displays ?? variants

  const handleChange = (event: React.MouseEvent<HTMLElement>, newValue: T) => {
    onChange(newValue)
  }

  return (
    <ToggleButtonGroup
      fullWidth
      exclusive
      size="small"
      value={value}
      onChange={handleChange}
    >
      {variants.map((variant, index) => (
        <ToggleButton
          key={variant}
          value={variant}
          // selected={value === variant}
          // onClick={() => onChange(variant)}
        >
          {_displays[index]}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  )
}
