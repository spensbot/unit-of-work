import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
} from "@mui/material"
import { useActivePortfolio } from "../Portfolio/Portfolio"
import UserView from "./UserView"

interface Props {
  userGuid?: string
  onChange: (newUserGuid: string) => void
  label?: string
  id?: string
}

export default function UserSelect({
  userGuid,
  onChange,
  label,
  id = "UserSelect",
}: Props) {
  let userGuids = useActivePortfolio((p) => p.userGuids)

  let selectVariants = [...userGuids, undefined]
  const labelId = `${id}-label`

  return (
    <FormControl fullWidth>
      {label && <InputLabel id={labelId}>{label}</InputLabel>}
      <MuiSelect
        labelId={labelId}
        id={id}
        value={userGuid}
        label={label}
        onChange={(e) => onChange(e.target.value as string)}
      >
        {selectVariants.map((variantGuid) => (
          <MenuItem key={variantGuid ?? "None"} value={variantGuid}>
            {variantGuid ? <UserView guid={variantGuid} /> : "None"}
          </MenuItem>
          // <UserSelectItem key={variantGuid} guid={variantGuid} />
        ))}
      </MuiSelect>
    </FormControl>
  )
}
