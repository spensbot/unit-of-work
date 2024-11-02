import { Box, Typography } from "@mui/material"
import { FieldVal, UserFieldVal } from "./FieldVal"
import MultiSelectView from "./MultiSelectView"
import { mapKeys, mapValues } from "../util/functional"
import { useActivePortfolio } from "../Portfolio/Portfolio"

export default function FieldTotalView({ total }: { total?: FieldVal }) {
  if (total === undefined) return null

  return (
    <Box paddingX={1}>
      <BaseTotalView total={total} />
    </Box>
  )
}

function BaseTotalView({ total }: { total: FieldVal }) {
  switch (total.t) {
    case "User":
      return <UserTotalView total={total} />
    case "Number":
      return <Typography>{total.val}</Typography>
    case "Date":
      return <Typography>{total.unix}</Typography>
    case "Select":
      return <MultiSelectView vals={total.vals} />
  }
}

function UserTotalView({ total }: { total: UserFieldVal }) {
  const users = useActivePortfolio((p) => p.usersByGuid)

  const names = mapKeys(total.guids, (guid) => users[guid].username)

  return <MultiSelectView vals={names} />
}
