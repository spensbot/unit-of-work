import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { newPortfolio, Portfolio } from './Portfolio'
import { Unit } from '../Unit/Unit'
import { Field } from '../Field/Field'
import { FilterDef, SortDef, GroupDef } from '../View/View'

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState: newPortfolio(),
  reducers: {
    setName: (state, { payload }: PayloadAction<string>) => {
      state.name = payload
    },
    setDescription: (state, { payload }: PayloadAction<string>) => {
      state.description = payload
    },
    addUnit: (state, { payload: { unit, parentGuid } }: PayloadAction<{ unit: Unit, parentGuid?: string }>) => {
      state.unitsByGuid[unit.guid] = unit
      if (parentGuid === undefined) {
        state.rootUnitGuids.push(unit.guid)
      } else {
        unit.childrenGuids.push(unit.guid)
      }
      state.activeViewUnitGuids = getActiveViewUnitGuids(state)
    },
    setUnitName: (state, { payload }: PayloadAction<{ guid: string, name: string }>) => {
      state.unitsByGuid[payload.guid].name = payload.name
    },
    setActiveView: (state, { payload }: PayloadAction<{ guid: string }>) => {
      state.activeViewGuid = payload.guid
      state.activeViewUnitGuids = getActiveViewUnitGuids(state)
    },
    setField: (state, { payload }: PayloadAction<{ unitGuid: string, fieldDefGuid: string, val?: Field }>) => {
      state.unitsByGuid[payload.unitGuid].fieldsByDefGuid[payload.fieldDefGuid] = payload.val
    },
    setFilter: (state, { payload }: PayloadAction<FilterDef | undefined>) => {
      state.viewsByGuid[state.activeViewGuid].filter = payload
      state.activeViewUnitGuids = getActiveViewUnitGuids(state)
    },
    setSort: (state, { payload }: PayloadAction<SortDef | undefined>) => {
      state.viewsByGuid[state.activeViewGuid].sort = payload
      state.activeViewUnitGuids = getActiveViewUnitGuids(state)
    },
    setGroup: (state, { payload }: PayloadAction<GroupDef | undefined>) => {
      state.viewsByGuid[state.activeViewGuid].group = payload
      state.activeViewUnitGuids = getActiveViewUnitGuids(state)
    },
    setDepth: (state, { payload }: PayloadAction<number>) => {
      state.viewsByGuid[state.activeViewGuid].depth = payload
      state.activeViewUnitGuids = getActiveViewUnitGuids(state)
    }
  }
})

export const {
  setName,
  setDescription,
  addUnit,
  setUnitName,
  setActiveView,
  setField,
  setFilter,
  setSort,
  setGroup,
  setDepth
} = portfolioSlice.actions

export const portfolioReducer = portfolioSlice.reducer

function getActiveViewUnitGuids(state: Portfolio): string[] {
  if (state.activeViewGuid === undefined) {
    return state.rootUnitGuids
  }
  const units = state.rootUnitGuids.map(guid => state.unitsByGuid[guid])
  // const view = state.viewsByGuid[state.activeViewGuid]
  // TODO: Apply filter, sort, group.
  return units.map(u => u.guid)
}