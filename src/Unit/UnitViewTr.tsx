import styled from "@emotion/styled"
import { useAppDispatch } from "../config/store"
import DisplayInput from "../components/DisplayInput"
import { useActivePortfolio } from "../Portfolio/Portfolio"
import { setActiveUnit, setUnitName } from "../Portfolio/portfolioSlice"
import FieldView from "../Field/FieldValView"
import { Box } from "@mui/material"
import DragHandleIcon from "@mui/icons-material/DragHandle"
import { memo } from "react"

export default memo(UnitViewTr)

function UnitViewTr({ guid }: { guid: string }) {
  const isActive = useActivePortfolio((p) => p.activeUnitGuid === guid)
  const name = useActivePortfolio((p) => p.unitsByGuid[guid].name)
  const fieldGuids = useActivePortfolio((p) => p.fieldGuids)
  const dispatch = useAppDispatch()

  if (isActive) console.log("ActiveUnit")

  return (
    <Root isActive={isActive}>
      <Td>
        <Box display="flex" alignItems="center">
          {UnitSelect(guid)}
          <DisplayInput
            value={name}
            onChange={(name) =>
              dispatch(
                setUnitName({
                  guid,
                  name,
                })
              )
            }
          />
        </Box>
      </Td>
      {fieldGuids.map((fieldGuid) => (
        <UnitField
          key={guid + fieldGuid}
          unitGuid={guid}
          fieldDefGuid={fieldGuid}
        />
      ))}
      <Td />
    </Root>
  )
}

const Root = styled.tr<{ isActive: boolean }>`
  border-bottom: ${(props) =>
    !props.isActive && `1px solid ${props.theme.palette.divider}`};

  border: ${(props) =>
    props.isActive && `2px solid ${props.theme.palette.primary.main}`};
  /* background-color: green; */
`

// const Root = styled.tr<{ isActive: boolean }>`
//   border: ${(props) =>
//     props.isActive && `2px solid ${props.theme.palette.primary.main}`};
//   /* background-color: green; */
// `

const Td = styled.td``

function UnitField({
  unitGuid,
  fieldDefGuid,
}: {
  unitGuid: string
  fieldDefGuid: string
}) {
  const unit = useActivePortfolio((p) => p.unitsByGuid[unitGuid])
  const fieldDef = useActivePortfolio((p) => p.fieldsByGuid[fieldDefGuid])
  const field = unit.fieldValsByGuid[fieldDefGuid]

  return (
    <Td key={fieldDefGuid}>
      <FieldView unitGuid={unitGuid} field={field} def={fieldDef!} />
    </Td>
  )
}

function UnitSelect(guid: string) {
  const dispatch = useAppDispatch()

  return (
    <div
      onClick={() =>
        dispatch(
          setActiveUnit({
            guid,
          })
        )
      }
    >
      <DragHandleIcon />
    </div>
  )
}
