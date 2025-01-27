import { Field, field_ts } from "../Field"
import NumbersIcon from "@mui/icons-material/Numbers"
import DateIcon from "@mui/icons-material/CalendarMonth"
import { ToggleButton, ToggleButtonGroup } from "@mui/material"
import UserIcon from "@mui/icons-material/AccountCircle"
import CalculateIcon from "@mui/icons-material/Calculate"

const fieldTypes: { [key in Field["t"]]: JSX.Element } = {
  NumberField: <NumbersIcon />,
  DateField: <DateIcon />,
  UserField: <UserIcon />,
  SelectField: <>Select</>,
  CalculatedField: <CalculateIcon />,
}

export default function FieldTypeSelect({
  t,
  setT,
}: {
  t: Field["t"]
  setT: (t: Field["t"]) => void
}) {
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newValue: Field["t"]
  ) => {
    setT(newValue)
  }

  return (
    <ToggleButtonGroup
      fullWidth
      exclusive
      size="small"
      value={t}
      onChange={handleChange}
    >
      {field_ts.map((variant) => (
        <ToggleButton
          key={variant}
          value={variant}
          // selected={value === variant}
          // onClick={() => onChange(variant)}
        >
          {fieldTypes[variant]}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  )
}
