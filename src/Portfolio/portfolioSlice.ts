import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { newPortfolio, Portfolio } from './Portfolio'
import { Unit } from '../Unit/Unit'
import { Field } from '../Field/Field'

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
    setField: (state, { payload }: PayloadAction<{ unitGuid: string, fieldDefGuid: string, val: Field }>) => {
      state.unitsByGuid[payload.unitGuid].fieldsByDefGuid[payload.fieldDefGuid] = payload.val
    }
  }
})

export const { setName, setDescription, addUnit, setUnitName, setActiveView, setField } = portfolioSlice.actions

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