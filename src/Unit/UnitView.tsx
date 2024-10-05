import styled from "@emotion/styled"
import { useAppDispatch } from "../main/store"
import DisplayInput from "../components/DisplayInput"
import { useActivePortfolio } from "../Portfolio/Portfolio"
import { setUnitName } from "../Portfolio/portfolioSlice"

export default function UnitView({ guid }: { guid: string }) {
  const unit = useActivePortfolio((p) => p.unitsByGuid[guid])
  const dispatch = useAppDispatch()

  return (
    <Root>
      <DisplayInput
        value={unit.name}
        onChange={(name) =>
          dispatch(
            setUnitName({
              guid,
              name,
            })
          )
        }
      />
    </Root>
  )
}

const Root = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(1)};
  border-bottom: 1px solid ${({ theme }) => theme.palette.divider};
`
