import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
} from "@mui/material"
import { useActivePortfolio } from "../Portfolio/Portfolio"
import UserView from "./UserView"

interface Props {
  userGuid: string
  onChange: (newUserGuid: string) => void
  label?: string
}

export default function UserSelect({ userGuid, onChange, label }: Props) {
  const userGuids = useActivePortfolio((p) => p.userGuids)

  console.log(`${userGuid}, variants: ${userGuids}`)

  return (
    <FormControl fullWidth>
      {label && <InputLabel id="demo-simple-select-label">{label}</InputLabel>}
      <MuiSelect
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={userGuid}
        label={label}
        onChange={(e) => onChange(e.target.value as string)}
      >
        {userGuids.map((variantGuid) => (
          <MenuItem key={variantGuid} value={variantGuid}>
            <UserView guid={variantGuid} />
          </MenuItem>
          // <UserSelectItem key={variantGuid} guid={variantGuid} />
        ))}
      </MuiSelect>
    </FormControl>
  )
}
