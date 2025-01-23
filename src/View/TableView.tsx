import styled from "@emotion/styled"
import UnitViewTr, { GroupTotalViewTr } from "../Unit/UnitViewTr"
import Button from "@mui/material/Button"
import {
  addUnit,
  addUnitRandomized,
  setActiveUnit,
} from "../Portfolio/portfolioSlice"
import { newUnit } from "../Unit/Unit"
import { useActivePortfolio } from "../Portfolio/Portfolio"
import { useAppDispatch } from "../config/store"
import Box from "@mui/material/Box"
import FieldView from "../Field/FieldView"
import AddFieldButton from "../Field/Edit/AddFieldButton"
import { Grouping } from "./Grouping"
import { Typography } from "@mui/material"
import { Fragment } from "react/jsx-runtime"
import isDebug from "../isDebug"

export default function TableView() {
  const fieldGuids = useActivePortfolio((p) => p.fieldGuids)
  const grouping = useActivePortfolio((p) => p.activeViewGrouping)

  return (
    <Root>
      <Table>
        <thead>
          <Tr>
            <Th>Unit</Th>
            {fieldGuids.map((guid) => {
              return (
                <Th key={guid}>
                  <FieldView key={guid} guid={guid} />
                </Th>
              )
            })}
            <Th style={{ textAlign: "right" }}>
              <AddFieldButton />
            </Th>
          </Tr>
        </thead>
        <tbody>
          <GroupingView grouping={grouping} />
        </tbody>
        <tfoot />
      </Table>
      <Box height={(theme) => theme.spacing(2)} />
      <AddUnitButton />
      <AddUnitButtonRandomized />
    </Root>
  )
}

function GroupingView({ grouping }: { grouping: Grouping }) {
  const isBottom = grouping.members
    .map((m) => typeof m === "string")
    .every(Boolean)

  return (
    <>
      {grouping.members.map((member) => {
        if (typeof member === "string") {
          return <UnitViewTr key={member} guid={member} />
        } else {
          return (
            <Fragment key={member.name}>
              <Tr>
                <td />
                <td>
                  <Typography variant="h6" sx={{ paddingTop: 2 }}>
                    {member.name}
                  </Typography>
                </td>
              </Tr>
              <GroupingView key={member.name} grouping={member} />
            </Fragment>
          )
        }
      })}
      {isBottom && (
        <GroupTotalViewTr
          key={grouping.name ?? "RootGroupTotal"}
          grouping={grouping}
        />
      )}
    </>
  )
}

const Root = styled.div`
  display: flex;
  flex-direction: column;
`

const Table = styled.table`
  border-collapse: collapse;
`

const Tr = styled.tr`
  border-bottom: 1px solid ${({ theme }) => theme.palette.divider};
`

const Th = styled.th`
  text-align: left;
`

function AddUnitButton() {
  const dispatch = useAppDispatch()

  return (
    <Button
      fullWidth
      onClick={() => {
        const unit = newUnit()
        dispatch(addUnit({ unit }))
        dispatch(setActiveUnit({ guid: unit.guid }))
      }}
    >
      Add Unit
    </Button>
  )
}

function AddUnitButtonRandomized() {
  const dispatch = useAppDispatch()

  if (!isDebug) return null

  return (
    <Button
      fullWidth
      onClick={() => {
        dispatch(addUnitRandomized({ parentGuid: undefined }))
      }}
    >
      🤪 Add Unit (Randomized)
    </Button>
  )
}
