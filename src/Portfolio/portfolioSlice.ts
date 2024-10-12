import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { newPortfolio, Portfolio } from './Portfolio'
import { Unit } from '../Unit/Unit'
import { Filter, Sort, Group } from '../View/View'
import { FieldVal } from '../Field/FieldVal'
import parse from '../expression_language/parse/parse'
import evaluate from '../expression_language/evaluate/evaluate'

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
      updateActiveViewUnitGuids(state)
    },
    setUnitName: (state, { payload }: PayloadAction<{ guid: string, name: string }>) => {
      state.unitsByGuid[payload.guid].name = payload.name
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

function updateActiveViewUnitGuids(state: Portfolio) {
  const newGuids = getActiveViewUnitGuids(state)

  if (JSON.stringify(state.activeViewUnitGuids) !== JSON.stringify(newGuids)) {
    console.log('Updating Active View Unit Guids')
    state.activeViewUnitGuids = newGuids
  }
}

function getActiveViewUnitGuids(state: Portfolio): string[] {
  if (state.activeViewGuid === undefined) {
    return state.rootUnitGuids
  }

  const activeView = state.viewsByGuid[state.activeViewGuid]

  let units = state.rootUnitGuids.map(guid => state.unitsByGuid[guid])
  // const view = state.vie wsByGuid[state.activeViewGuid]
  // TODO: Apply filter, sort, group.
  if (activeView.filter) units = applyFilter(units, activeView.filter, state)
  if (activeView.sort) units = applySort(units, activeView.sort, state)

  return units.map(u => u.guid)
}

function applyFilter(units: Unit[], filter: Filter, state: Portfolio): Unit[] {
  try {
    const ast = parse(filter.expression)
    return units.filter(u => {
      const context: { [key: string]: any } = {
        name: u.name,
        description: u.description,
      }
      for (const fieldGuid in u.fieldValsByGuid) {
        const field = state.fieldsByGuid[fieldGuid]!
        const fieldVal = u.fieldValsByGuid[fieldGuid]
        context[field.name] = getFieldVal(state, fieldVal)
      }
      try {
        return evaluate(ast, context)
      } catch (e) {
        // console.error(`Filter Expression Evaluation Error: ${e}`)
        return false
      }
    })
  } catch (e) {
    return units
  }
}

function getFieldVal(state: Portfolio, val?: FieldVal): number | string {
  if (val === undefined) return 0

  switch (val.t) {
    case 'User':
      return state.usersByGuid[val.guid].username
    case 'Date':
      return val.unix
    case 'Number':
      return val.val
    case 'Select':
      return val.val
  }
}

function applySort(units: Unit[], sort: Sort, state: Portfolio): Unit[] {
  return [...units].sort((a, b) => {
    const fieldGuid = sort.fieldGuid
    const aVal = sortVal(state, fieldGuid, a.fieldValsByGuid[sort.fieldGuid])
    const bVal = sortVal(state, fieldGuid, b.fieldValsByGuid[sort.fieldGuid])
    if (aVal < bVal) {
      return -1
    } else if (aVal > bVal) {
      return 1
    }
    return 0
  })
}

function sortVal(state: Portfolio, fieldGuid: string, val?: FieldVal): number | string {
  if (val === undefined) {
    const field = state.fieldsByGuid[fieldGuid]!
    if (field.t === 'NumberField' || field.t === 'DateField') return Infinity
    return 'z'
  }

  switch (val.t) {
    case 'User':
      return state.usersByGuid[val.guid].username
    case 'Date':
      return val.unix
    case 'Number':
      return val.val
    case 'Select':
      return val.val
  }
}

// function applyGroup(units: Unit[], group: Group): Unit[] {

// }