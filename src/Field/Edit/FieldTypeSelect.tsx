import SelectGroup from "../../components/SelectGroup"
import { Field, field_ts } from "../Field"
import NumbersIcon from "@mui/icons-material/Numbers"
import DateIcon from "@mui/icons-material/CalendarMonth"
import UserIcon from "@mui/icons-material/AccountCircle"
import { ToggleButton, ToggleButtonGroup } from "@mui/material"

const fieldTypes: { [key in Field["t"]]: JSX.Element } = {
  NumberField: <NumbersIcon />,
  DateField: <DateIcon />,
  UserField: <UserIcon />,
  SelectField: <>Select</>,
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
      {field_ts.map((variant, index) => (
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
