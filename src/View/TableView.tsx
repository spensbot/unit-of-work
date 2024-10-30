import styled from "@emotion/styled"
import UnitViewTr from "../Unit/UnitViewTr"
import Button from "@mui/material/Button"
import { addUnit, setActiveUnit } from "../Portfolio/portfolioSlice"
import { newUnit } from "../Unit/Unit"
import { useActivePortfolio } from "../Portfolio/Portfolio"
import { useAppDispatch } from "../config/store"
import Box from "@mui/material/Box"
import FieldView from "../Field/FieldView"
import AddFieldButton from "../Field/Edit/AddFieldButton"

export default function TableView() {
  const fieldGuids = useActivePortfolio((p) => p.fieldGuids)
  const fieldsByGuid = useActivePortfolio((p) => p.fieldsByGuid)
  const viewUnits = useActivePortfolio((p) => p.activeViewUnitGuids)

  return (
    <Root>
      <Table>
        <thead>
          <Tr>
            <Th></Th>
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
          {viewUnits.map((unitGuid) => {
            return <UnitViewTr key={unitGuid} guid={unitGuid} />
          })}
        </tbody>
        <tfoot />
      </Table>
      <Box height={(theme) => theme.spacing(2)} />
      <AddUnitButton />
      <AddUnitButtonRandomized />
    </Root>
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
  const fieldGuids = useActivePortfolio((p) => p.fieldGuids)
  const fieldsByGuid = useActivePortfolio((p) => p.fieldsByGuid)
  const userGuids = useActivePortfolio((p) => p.userGuids)

  const fields = fieldGuids.map((guid) => fieldsByGuid[guid])

  return (
    <Button
      fullWidth
      onClick={() => {
        const unit = newUnit()
        unit.name = randomName()
        fields.forEach((field) => {
          switch (field.t) {
            case "DateField":
              break
            case "NumberField":
              unit.fieldValsByGuid[field.guid] = {
                t: "Number",
                val: randomModifiedFibonacci(),
              }
              break
            case "SelectField":
              const option = getRandomVal(field.selectOptions)
              unit.fieldValsByGuid[field.guid] = {
                t: "Select",
                vals: {
                  [option]: 1,
                },
              }
              break
            case "UserField":
              const userGuid = getRandomVal(userGuids)
              unit.fieldValsByGuid[field.guid] = {
                t: "User",
                guids: {
                  [userGuid]: 1,
                },
              }
              break
          }
        })
        dispatch(addUnit({ unit }))
        dispatch(setActiveUnit({ guid: unit.guid }))
      }}
    >
      🤪 Add Unit (Randomized)
    </Button>
  )
}

function randomModifiedFibonacci(): number {
  const fib = [1, 2, 3, 5, 8, 13, 20, 40, 100]
  return fib[Math.floor(Math.random() * fib.length)]
}

function randomName() {
  const verbs = [
    "Build",
    "Fix",
    "Optimize",
    "Refactor",
    "Test",
    "Deploy",
    "Monitor",
    "Document",
    "Design",
    "Review",
  ]
  const nouns = [
    "App",
    "Website",
    "Database",
    "API",
    "Server",
    "Client",
    "Framework",
    "Library",
  ]

  return `${getRandomVal(verbs)} the ${getRandomVal(nouns)}`
}

function getRandomVal<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}
