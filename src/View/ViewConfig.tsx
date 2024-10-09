import styled from "@emotion/styled"
import { useActiveView } from "./View"
import { useAppDispatch } from "../config/store"
import {
  setFilter,
  setSort,
  setGroup,
  setLayer,
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
      <LayersView />
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
  const fields = useActivePortfolio((p) => p.fieldDefGuids)

  return (
    <SubRoot>
      <Select
        value={filter?.fieldGuid ?? null}
        onChange={(newFieldGuid) =>
          dispatch(
            setFilter(newFieldGuid ? { fieldGuid: newFieldGuid } : undefined)
          )
        }
        variants={fields}
        label="Filter"
      />
    </SubRoot>
  )
}

function SortView() {
  const dispatch = useAppDispatch()
  const sort = useActiveView((v) => v.sort)
  const fields = useActivePortfolio((p) => p.fieldDefGuids)

  return (
    <SubRoot>
      <Select
        value={sort?.fieldGuid ?? null}
        onChange={(newFieldGuid) =>
          dispatch(
            setSort(newFieldGuid ? { fieldGuid: newFieldGuid } : undefined)
          )
        }
        variants={fields}
        label="Sort"
      />
    </SubRoot>
  )
}

function GroupView() {
  const dispatch = useAppDispatch()
  const group = useActiveView((v) => v.group)
  const fields = useActivePortfolio((p) => p.fieldDefGuids)

  return (
    <SubRoot>
      <Select
        value={group?.fieldGuid ?? null}
        onChange={(newFieldGuid) =>
          dispatch(
            setGroup(newFieldGuid ? { fieldGuid: newFieldGuid } : undefined)
          )
        }
        variants={fields}
        label="Group"
      />
    </SubRoot>
  )
}

function LayersView() {
  const dispatch = useAppDispatch()
  const availableLayers = 3
  const layerMin = useActiveView((v) => v.layerMin)
  const layerMax = useActiveView((v) => v.layerMax)

  if (availableLayers < 2) {
    return null
  }

  return (
    <SubRoot>
      <Box sx={{ width: 200 }}>
        <Slider
          value={[layerMin ?? 1, layerMax ?? 1]}
          onChange={(_, newValue) => {
            if (!Array.isArray(newValue)) {
              console.error("Expected array")
              return
            }
            dispatch(setLayer({ min: newValue[0], max: newValue[1] }))
          }}
          valueLabelDisplay="auto"
          min={1}
          max={availableLayers}
          step={1}
        />
      </Box>
    </SubRoot>
  )
}

const SubRoot = styled.div`
  width: ${({ theme }) => theme.spacing(15)};
`
