import styled from "@emotion/styled"
import { useActiveView } from "./View"
import { useAppDispatch } from "../config/store"
import {
  setFilter,
  setSort,
  setGroup,
  setDepth,
} from "../Portfolio/portfolioSlice"
import Select from "../components/Select"
import { useActivePortfolio } from "../Portfolio/Portfolio"
import { Box, Slider } from "@mui/material"

export default function ViewConfig() {
  return (
    <Root>
      <FilterView />
      <SortView />
      <GroupView />
      <DepthView />
    </Root>
  )
}

const Root = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(2)};
`

function FilterView() {
  const dispatch = useAppDispatch()
  const filter = useActiveView((v) => v.filter)
  const fieldDefs = useActivePortfolio((p) => p.fieldDefGuids)
  const fieldDefsByGuid = useActivePortfolio((p) => p.fieldDefsByGuid)

  return (
    <SubRoot>
      <Select
        value={filter?.fieldGuid ?? null}
        onChange={(newFieldGuid) =>
          dispatch(
            setFilter(newFieldGuid ? { fieldGuid: newFieldGuid } : undefined)
          )
        }
        variants={fieldDefs}
        displays={fieldDefs.map((guid) => fieldDefsByGuid[guid]?.name ?? "")}
        label="Filter"
      />
    </SubRoot>
  )
}

function SortView() {
  const dispatch = useAppDispatch()
  const sort = useActiveView((v) => v.sort)
  const fieldDefs = useActivePortfolio((p) => p.fieldDefGuids)
  const fieldDefsByGuid = useActivePortfolio((p) => p.fieldDefsByGuid)

  return (
    <SubRoot>
      <Select
        value={sort?.fieldGuid ?? null}
        onChange={(newFieldGuid) =>
          dispatch(
            setSort(newFieldGuid ? { fieldGuid: newFieldGuid } : undefined)
          )
        }
        variants={fieldDefs}
        displays={fieldDefs.map((guid) => fieldDefsByGuid[guid]?.name ?? "")}
        label="Sort"
      />
    </SubRoot>
  )
}

function GroupView() {
  const dispatch = useAppDispatch()
  const group = useActiveView((v) => v.group)
  const fieldDefs = useActivePortfolio((p) => p.fieldDefGuids)
  const fieldDefsByGuid = useActivePortfolio((p) => p.fieldDefsByGuid)

  return (
    <SubRoot>
      <Select
        value={group?.fieldGuid ?? null}
        onChange={(newFieldGuid) =>
          dispatch(
            setGroup(newFieldGuid ? { fieldGuid: newFieldGuid } : undefined)
          )
        }
        variants={fieldDefs}
        displays={fieldDefs.map((guid) => fieldDefsByGuid[guid]?.name ?? "")}
        label="Group"
      />
    </SubRoot>
  )
}

function DepthView() {
  const dispatch = useAppDispatch()
  const availableDepth = 2
  const depth = useActiveView((v) => v.depth)

  if (availableDepth < 1) {
    return null
  }

  return (
    <SubRoot>
      <Box sx={{ width: 200 }}>
        <Slider
          value={depth}
          onChange={(_, newValue) => {
            if (!Array.isArray(newValue)) {
              dispatch(setDepth(newValue))
            }
          }}
          valueLabelDisplay="auto"
          min={0}
          max={availableDepth}
          step={1}
        />
      </Box>
    </SubRoot>
  )
}

const SubRoot = styled.div`
  width: ${({ theme }) => theme.spacing(15)};
`
