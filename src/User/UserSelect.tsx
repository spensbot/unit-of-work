import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
} from "@mui/material"
import { useActivePortfolio } from "../Portfolio/Portfolio"
import UserView from "./UserView"

const NULL_ITEM_VALUE = 0
const NULL_ITEM_DISPLAY = "---"

interface Props {
  userGuid?: string
  onChange: (newUserGuid: string | undefined) => void
  label?: string
  id?: string
  faded?: boolean
}

export default function UserSelect({
  userGuid,
  onChange,
  label,
  id = "UserSelect",
  faded,
}: Props) {
  const userGuids = useActivePortfolio((p) => p.userGuids)

  const labelId = `${id}-label`

  const _value = userGuid ?? NULL_ITEM_VALUE
  const _variants: (string | 0)[] = [...userGuids, NULL_ITEM_VALUE]

  return (
    <FormControl fullWidth>
      {label && <InputLabel id={labelId}>{label}</InputLabel>}
      <MuiSelect
        size="small"
        labelId={labelId}
        id={id}
        value={_value}
        label={label}
        onChange={(e) => {
          const updated = (
            e.target.value === NULL_ITEM_VALUE ? undefined : e.target.value
          ) as string | undefined
          onChange(updated)
        }}
        sx={{
          color: faded ? "text.disabled" : "inherit",
        }}
      >
        {_variants.map((variantGuid) => (
          <MenuItem key={variantGuid} value={variantGuid}>
            {variantGuid ? <UserView guid={variantGuid} /> : NULL_ITEM_DISPLAY}
          </MenuItem>
          // <UserSelectItem key={variantGuid} guid={variantGuid} />
        ))}
      </MuiSelect>
    </FormControl>
  )
}
