import styled from "@emotion/styled"
import { useAppDispatch } from "../config/store"
import DisplayInput from "../components/DisplayInput"
import { Portfolio, useActivePortfolio } from "../Portfolio/Portfolio"
import {
  deleteUnit,
  setActiveUnit,
  setUnitName,
} from "../Portfolio/portfolioSlice"
import FieldValView from "../Field/FieldValView"
import { Box, IconButton } from "@mui/material"
import DragHandleIcon from "@mui/icons-material/DragHandle"
import { memo } from "react"
import { Delete } from "@mui/icons-material"

export default memo(UnitViewTr)

function UnitViewTr({ guid }: { guid: string }) {
  const isActive = useActivePortfolio((p) => p.activeUnitGuid === guid)
  const name = useActivePortfolio((p) => p.unitsByGuid[guid].name)
  const fieldGuids = useActivePortfolio((p) => p.fieldGuids)
  const dispatch = useAppDispatch()

  return (
    <Root isActive={isActive}>
      <UnitDepth guid={guid} />
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
      <Td style={{ textAlign: "right" }}>
        <IconButton onClick={() => dispatch(deleteUnit({ guid }))}>
          <Delete />
        </IconButton>
      </Td>
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
  const field = useActivePortfolio((p) => p.fieldsByGuid[fieldDefGuid])
  const val = unit.fieldValsByGuid[fieldDefGuid]

  return (
    <Td key={fieldDefGuid}>
      <FieldValView unitGuid={unitGuid} field={field!} val={val} />
    </Td>
  )
}

function UnitSelect(guid: string) {
  const dispatch = useAppDispatch()

  return (
    <IconButton
      onClick={() =>
        dispatch(
          setActiveUnit({
            guid,
          })
        )
      }
    >
      <DragHandleIcon />
    </IconButton>
  )
}

function UnitDepth({ guid }: { guid: string }) {
  const depth = useActivePortfolio((p) => getDepth(guid, p))

  return (
    <Td>
      <Box display="flex" gap="0.2rem">
        {Array.from({ length: depth + 1 }).map((_, i) => (
          <DepthIcon key={i} />
        ))}
      </Box>
    </Td>
  )
}

function DepthIcon() {
  const size = "0.8rem"
  return (
    // <Box bgcolor={"purple"} width={size} height={size} borderRadius={size} />
    <Box
      bgcolor={"purple"}
      width={"0.3rem"}
      height={"1rem"}
      borderRadius={size}
    />
  )
}

function getDepth(unitGuid: string, portfolio: Portfolio): number {
  const unit = portfolio.unitsByGuid[unitGuid]
  if (unit.parentGuid === undefined) {
    return 0
  } else {
    return 1 + getDepth(unit.parentGuid, portfolio)
  }
}
