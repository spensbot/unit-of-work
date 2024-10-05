import styled from "@emotion/styled"
import { useAppDispatch } from "../config/store"
import DisplayInput from "../components/DisplayInput"
import { useActivePortfolio } from "../Portfolio/Portfolio"
import { setUnitName } from "../Portfolio/portfolioSlice"
import FieldView from "../Field/FieldView"

export default function UnitViewTr({ guid }: { guid: string }) {
  const unit = useActivePortfolio((p) => p.unitsByGuid[guid])
  const fieldDefGuids = useActivePortfolio((p) => p.fieldDefGuids)
  const dispatch = useAppDispatch()

  return (
    <Root>
      <Td>
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
      </Td>
      {fieldDefGuids.map((guid) => {
        return (
          <Td key={guid}>
            <FieldView field={unit.fieldsByDefGuid[guid]!} />
          </Td>
        )
      })}
      <Td />
    </Root>
  )
}

const Root = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.palette.divider};
  /* background-color: green; */
`

const Td = styled.td``

// const Root = styled.div`
//   display: flex;
//   align-items: center;
//   gap: ${({ theme }) => theme.spacing(1)};
//   border-bottom: 1px solid ${({ theme }) => theme.palette.divider};
// `
