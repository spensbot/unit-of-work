import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { newPortfolio } from './Portfolio'
import { Unit } from '../Unit/Unit'
import { Filter, Sort, Group, View, UnitFilter, newTableView } from '../View/View'
import { FieldVal } from '../Field/FieldVal'
import updatePortfolio from './updatePortfolio'
import { Field } from '../Field/Field'
import createRandomizedUnit from '../Unit/createRandomizedUnit'
import { Log } from '../util/Log'

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
    setLevelName: (state, { payload: { i, newName } }: PayloadAction<{ i: number, newName: string }>) => {
      state.levelNames[i] = newName
    },
    setMoveUnit: (state, { payload }: PayloadAction<{ guid?: string }>) => {
      state.moveUnitGuid = payload.guid
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
      delete state.moveUnitGuid
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
    applyFieldToChildren: (state, { payload }: PayloadAction<{ unitGuid: string, fieldGuid: string }>) => {
      const parent = state.unitsByGuid[payload.unitGuid]
      const field = state.fieldsByGuid[payload.fieldGuid]

      const parentFieldVal = parent.fieldValsByGuid[payload.fieldGuid]

      if (!field) return Log.Error('Field does not exist')
      if (field.propogateDown !== 'Inherit') return Log.Error('Field does not propogate down')
      if (parentFieldVal === undefined) return Log.Error('Parent does not have field value')
      if (parent.childrenGuids.length === 0) return Log.Error('Parent has no children')

      parent.childrenGuids.forEach(childGuid => {
        const child = state.unitsByGuid[childGuid]
        if (child.fieldValsByGuid[payload.fieldGuid] === undefined) {
          child.fieldValsByGuid[payload.fieldGuid] = parentFieldVal
        }
      })

      delete parent.fieldValsByGuid[payload.fieldGuid]

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
    setFieldVal: (state, { payload }: PayloadAction<{ unitGuid: string, fieldGuid: string, val?: FieldVal }>) => {
      if (payload.val === undefined) {
        delete state.unitsByGuid[payload.unitGuid].fieldValsByGuid[payload.fieldGuid]
      } else {
        state.unitsByGuid[payload.unitGuid].fieldValsByGuid[payload.fieldGuid] = payload.val
      }
      updatePortfolio(state)
    },

    // View
    addView: (state, { payload }: PayloadAction<View>) => {
      state.viewsByGuid[payload.guid] = payload
      state.viewGuids.push(payload.guid)
      state.activeViewGuid = payload.guid
      updatePortfolio(state)
    },
    setActiveView: (state, { payload }: PayloadAction<{ guid: string }>) => {
      state.activeViewGuid = payload.guid
      updatePortfolio(state)
    },
    createViewWithFocusUnit: (state, { payload }: PayloadAction<string>) => {
      const focusUnitId = payload
      const unitName = state.unitsByGuid[focusUnitId].name
      const view = newTableView(unitName)
      state.viewsByGuid[view.guid] = view
      state.viewGuids.push(view.guid)
      state.activeViewGuid = view.guid
      state.viewsByGuid[state.activeViewGuid].focusUnits = [focusUnitId]
      updatePortfolio(state)
    },
    setViewFocusUnits: (state, { payload }: PayloadAction<string[]>) => {
      state.viewsByGuid[state.activeViewGuid].focusUnits = payload
      updatePortfolio(state)
    },
    addFilter: (state, { payload }: PayloadAction<Filter>) => {
      state.viewsByGuid[state.activeViewGuid].filters?.push(payload)
      updatePortfolio(state)
    },
    removeFilter: (state, { payload }: PayloadAction<number>) => {
      const filters = state.viewsByGuid[state.activeViewGuid].filters
      filters.splice(payload, 1)
      updatePortfolio(state)
    },
    modifyFilter: (state, { payload }: PayloadAction<{ i: number, filter: Filter }>) => {
      const activeView = state.viewsByGuid[state.activeViewGuid]
      activeView.filters[payload.i] = payload.filter
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
      updatePortfolio(state)
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
  setLevelName,
  setMoveUnit,

  // Unit
  addUnit,
  addUnitRandomized,
  setActiveUnit,
  setUnitName,
  setUnitDescription,
  moveUnit,
  deleteUnit,
  applyFieldToChildren,

  // Field
  addField,
  setField,
  deleteField,

  // Field Val
  setFieldVal,

  // View 
  addView,
  setActiveView,
  createViewWithFocusUnit,
  setViewFocusUnits,
  addFilter,
  removeFilter,
  modifyFilter,
  setSort,
  setGroup,
  setDepth,
  setViewName,
  deleteView,

  // Debug
  enterErrorState,
} = portfolioSlice.actions

export const portfolioReducer = portfolioSlice.reducer