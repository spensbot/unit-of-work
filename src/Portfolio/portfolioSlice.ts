import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { newPortfolio } from './Portfolio'
import { Unit } from '../Unit/Unit'
import { Filter, Sort, Group, View } from '../View/View'
import { FieldVal } from '../Field/FieldVal'
import updatePortfolio from './updatePortfolio'
import { Field } from '../Field/Field'
import createRandomizedUnit from '../Unit/createRandomizedUnit'

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState: newPortfolio(),
  reducers: {
    // Portfolio
    setName: (state, { payload }: PayloadAction<string>) => {
      state.name = payload
    },
    setDescription: (state, { payload }: PayloadAction<string>) => {
      state.description = payload
    },

    // Unit
    addUnit: (state, { payload: { unit } }: PayloadAction<{ unit: Unit }>) => {
      state.unitsByGuid[unit.guid] = unit
      if (unit.parentGuid === undefined) {
        state.rootUnitGuids.push(unit.guid)
      } else {
        state.unitsByGuid[unit.parentGuid].childrenGuids.push(unit.guid)
      }
      updatePortfolio(state)
    },
    addUnitRandomized: (state, { payload: { parentGuid } }: PayloadAction<{ parentGuid?: string }>) => {
      const unit = createRandomizedUnit(state, parentGuid)
      state.unitsByGuid[unit.guid] = unit
      if (unit.parentGuid === undefined) {
        state.rootUnitGuids.push(unit.guid)
        state.activeUnitGuid = unit.guid
      } else {
        state.unitsByGuid[unit.parentGuid].childrenGuids.push(unit.guid)
      }
      updatePortfolio(state)
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
      updatePortfolio(state)
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
      updatePortfolio(state)
    },

    // Field
    addField: (state, { payload }: PayloadAction<Field>) => {
      state.fieldGuids.push(payload.guid)
      state.fieldsByGuid[payload.guid] = payload
      updatePortfolio(state)
    },
    setField: (state, { payload }: PayloadAction<Field>) => {
      state.fieldsByGuid[payload.guid] = payload
      updatePortfolio(state)
    },
    deleteField: (state, { payload }: PayloadAction<{ guid: string }>) => {
      state.fieldGuids = state.fieldGuids.filter(guid => guid !== payload.guid)
      delete state.fieldsByGuid[payload.guid]
      updatePortfolio(state)
    },

    // Field Val
    setFieldVal: (state, { payload }: PayloadAction<{ unitGuid: string, fieldDefGuid: string, val?: FieldVal }>) => {
      if (payload.val === undefined) {
        delete state.unitsByGuid[payload.unitGuid].fieldValsByGuid[payload.fieldDefGuid]
      } else {
        state.unitsByGuid[payload.unitGuid].fieldValsByGuid[payload.fieldDefGuid] = payload.val
      }
      updatePortfolio(state)
    },

    // View
    addView: (state, { payload }: PayloadAction<View>) => {
      state.viewsByGuid[payload.guid] = payload
      state.viewGuids.push(payload.guid)
      state.activeViewGuid = payload.guid
    },
    setActiveView: (state, { payload }: PayloadAction<{ guid: string }>) => {
      state.activeViewGuid = payload.guid
      updatePortfolio(state)
    },
    setFilter: (state, { payload }: PayloadAction<Filter | undefined>) => {
      state.viewsByGuid[state.activeViewGuid].filter = payload
      updatePortfolio(state)
    },
    setSort: (state, { payload }: PayloadAction<Sort | undefined>) => {
      state.viewsByGuid[state.activeViewGuid].sort = payload
      updatePortfolio(state)
    },
    setGroup: (state, { payload }: PayloadAction<Group | undefined>) => {
      state.viewsByGuid[state.activeViewGuid].group = payload
      updatePortfolio(state)
    },
    setDepth: (state, { payload }: PayloadAction<number>) => {
      state.viewsByGuid[state.activeViewGuid].depth = payload
      updatePortfolio(state)
    },
    setViewName: (state, { payload }: PayloadAction<{ guid: string, name: string }>) => {
      state.viewsByGuid[payload.guid].name = payload.name
    },
    deleteView: (state, { payload }: PayloadAction<{ guid: string }>) => {
      if (state.viewGuids.length < 2) return
      delete state.viewsByGuid[payload.guid]
      state.viewGuids = state.viewGuids.filter(guid => guid !== payload.guid)
      if (state.activeViewGuid === payload.guid) {
        state.activeViewGuid = state.viewGuids[0]
      }
    },

    // Debug
    enterErrorState: (state, _: PayloadAction) => {
      state.activeUnitGuid = "THIS UNIT ISN'T REAL. NOTHING IS REAL"
    },
  }
})

export const {
  // Portfolio
  setName,
  setDescription,

  // Unit
  addUnit,
  addUnitRandomized,
  setActiveUnit,
  setUnitName,
  setUnitDescription,
  moveUnit,
  deleteUnit,

  // Field
  addField,
  setField,
  deleteField,

  // Field Val
  setFieldVal,

  // View 
  addView,
  setActiveView,
  setFilter,
  setSort,
  setGroup,
  setDepth,
  setViewName,
  deleteView,

  // Debug
  enterErrorState,
} = portfolioSlice.actions

export const portfolioReducer = portfolioSlice.reducer