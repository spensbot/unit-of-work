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
import { Grouping } from "../View/Grouping"
import FieldTotalView from "../Field/FieldTotalView"

export default memo(UnitViewTr)

function UnitViewTr({ guid }: { guid: string }) {
  const isActive = useActivePortfolio((p) => p.activeUnitGuid === guid)
  const name = useActivePortfolio((p) => p.unitsByGuid[guid].name)
  const fieldGuids = useActivePortfolio((p) => p.fieldGuids)
  const dispatch = useAppDispatch()

  return (
    <Root isActive={isActive}>
      <Td>
        <Box display="flex" alignItems="center">
          <UnitSelect guid={guid} />
          <UnitDepth guid={guid} />
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

export function GroupTotalViewTr({ grouping }: { grouping: Grouping }) {
  const fieldGuids = useActivePortfolio((p) => p.fieldGuids)

  return (
    <Root isActive={false}>
      <td></td>
      {fieldGuids.map((fieldGuid) => {
        return (
          <td key={fieldGuid}>
            <FieldTotalView total={grouping.fieldTotalsByGuid[fieldGuid]} />
          </td>
        )
      })}
    </Root>
  )
}

const Root = styled.tr<{ isActive: boolean }>`
  border: ${(props) =>
    props.isActive
      ? `2px solid ${props.theme.palette.primary.main}`
      : `2px solid transparent`};

  border-bottom: ${(props) =>
    !props.isActive && `1px solid ${props.theme.palette.divider}`};
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
  const field = useActivePortfolio((p) => p.fieldsByGuid[fieldDefGuid])

  return (
    <Td key={fieldDefGuid}>
      <FieldValView unitGuid={unitGuid} field={field!} />
    </Td>
  )
}

function UnitSelect({ guid }: { guid: string }) {
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
    <Box display="flex" gap="0.2rem">
      {Array.from({ length: depth + 1 }).map((_, i) => (
        <DepthIcon key={i} />
      ))}
    </Box>
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
