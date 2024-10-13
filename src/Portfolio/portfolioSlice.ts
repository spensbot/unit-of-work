import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { newPortfolio, Portfolio } from './Portfolio'
import { Unit } from '../Unit/Unit'
import { Filter, Sort, Group } from '../View/View'
import { FieldVal } from '../Field/FieldVal'
import getActiveViewUnitGuids from '../View/getActiveViewUnitGuids'

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
    addUnit: (state, { payload: { unit } }: PayloadAction<{ unit: Unit }>) => {
      state.unitsByGuid[unit.guid] = unit
      if (unit.parentGuid === undefined) {
        state.rootUnitGuids.push(unit.guid)
      } else {
        state.unitsByGuid[unit.parentGuid].childrenGuids.push(unit.guid)
      }
      updateActiveViewUnitGuids(state)
    },
    setActiveUnit: (state, { payload }: PayloadAction<{ guid?: string }>) => {
      state.activeUnitGuid = payload.guid
    },
    setUnitName: (state, { payload }: PayloadAction<{ guid: string, name: string }>) => {
      state.unitsByGuid[payload.guid].name = payload.name
    },
    setUnitDescription: (state, { payload }: PayloadAction<{ guid: string, description: string }>) => {
      state.unitsByGuid[payload.guid].description = payload.description
    },
    deleteUnit: (state, { payload }: PayloadAction<{ guid: string }>) => {
      const unit = state.unitsByGuid[payload.guid]
      if (unit.parentGuid === undefined) {
        state.rootUnitGuids = state.rootUnitGuids.filter(guid => guid !== unit.guid)
      } else {
        state.unitsByGuid[unit.parentGuid].childrenGuids = state.unitsByGuid[unit.parentGuid].childrenGuids.filter(guid => guid !== unit.guid)
      }
      delete state.unitsByGuid[payload.guid]
      if (state.activeUnitGuid === payload.guid) {
        delete state.activeUnitGuid
      }
      updateActiveViewUnitGuids(state)
    },
    moveUnit: (state, { payload }: PayloadAction<{ guid: string, parentGuid?: string }>) => {
      const unit = state.unitsByGuid[payload.guid]
      // Remove child from old parent
      if (unit.parentGuid !== undefined) {
        const oldParent = state.unitsByGuid[unit.parentGuid]
        oldParent.childrenGuids = oldParent.childrenGuids.filter(guid => guid !== unit.guid)
      }
      // Assign new parent
      unit.parentGuid = payload.parentGuid
      // Add child to new parent
      if (unit.parentGuid !== undefined) {
        state.unitsByGuid[unit.parentGuid].childrenGuids.push(unit.guid)
      }
      updateActiveViewUnitGuids(state)
    },
    setActiveView: (state, { payload }: PayloadAction<{ guid: string }>) => {
      state.activeViewGuid = payload.guid
      updateActiveViewUnitGuids(state)
    },
    setField: (state, { payload }: PayloadAction<{ unitGuid: string, fieldDefGuid: string, val?: FieldVal }>) => {
      state.unitsByGuid[payload.unitGuid].fieldValsByGuid[payload.fieldDefGuid] = payload.val
    },
    setFilter: (state, { payload }: PayloadAction<Filter | undefined>) => {
      state.viewsByGuid[state.activeViewGuid].filter = payload
      updateActiveViewUnitGuids(state)
    },
    setSort: (state, { payload }: PayloadAction<Sort | undefined>) => {
      state.viewsByGuid[state.activeViewGuid].sort = payload
      updateActiveViewUnitGuids(state)
    },
    setGroup: (state, { payload }: PayloadAction<Group | undefined>) => {
      state.viewsByGuid[state.activeViewGuid].group = payload
      updateActiveViewUnitGuids(state)
    },
    setDepth: (state, { payload }: PayloadAction<number>) => {
      state.viewsByGuid[state.activeViewGuid].depth = payload
      updateActiveViewUnitGuids(state)
    },
    enterErrorState: (state, _: PayloadAction) => {
      state.activeUnitGuid = "THIS UNIT ISN'T REAL. NOTHING IS REAL"
    }
  }
})

export const {
  setName,
  setDescription,
  addUnit,
  setActiveUnit,
  setUnitName,
  setUnitDescription,
  moveUnit,
  deleteUnit,
  setActiveView,
  setField,
  setFilter,
  setSort,
  setGroup,
  setDepth,
  enterErrorState
} = portfolioSlice.actions

export const portfolioReducer = portfolioSlice.reducer

function updateActiveViewUnitGuids(state: Portfolio) {
  const newGuids = getActiveViewUnitGuids(state)

  if (JSON.stringify(state.activeViewUnitGuids) !== JSON.stringify(newGuids)) {
    console.log('Updating Active View Unit Guids')
    state.activeViewUnitGuids = newGuids
  }
}