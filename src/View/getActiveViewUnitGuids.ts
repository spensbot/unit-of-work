import { Portfolio } from "../Portfolio/Portfolio"
import { Unit } from "../Unit/Unit"
import { Filter, Sort } from "./View"
import { getActiveFieldVal } from "../Field/getFieldVal"
import { getFieldValPrimitive, getFieldValSortPrimitive } from "./getFieldValPrimitive"

// Deprecated
export default function getActiveViewUnitGuids(state: Portfolio): string[] {
  const activeView = state.viewsByGuid[state.activeViewGuid]

  // let units = state.rootUnitGuids.map(guid => state.unitsByGuid[guid])
  let units = state.rootUnitGuids.flatMap(guid => getUnitsRecursive(state.unitsByGuid[guid], activeView.depth, state))
  // const view = state.vie wsByGuid[state.activeViewGuid]
  // TODO: Apply filter, sort, group.
  if (activeView.filter) units = applyFilter(units, activeView.filter, state)
  if (activeView.sort) units = applySort(units, activeView.sort, state)

  return units.map(u => u.guid)
}

// Returns all units, including the given unit and all its children, recursively.
// Deprecated
function getUnitsRecursiveWithOverlap(unit: Unit, depth: number, state: Portfolio): Unit[] {
  if (depth === 1) return [unit]

  return [unit, ...unit.childrenGuids.flatMap(guid => getUnitsRecursiveWithOverlap(state.unitsByGuid[guid], depth - 1, state))]
}

// Returns the unit's children if it has any, otherwise returns the unit itself.
function getUnitsRecursive(unit: Unit, depth: number, state: Portfolio): Unit[] {
  if (depth === 1 || unit.childrenGuids.length === 0) return [unit]

  return unit.childrenGuids.flatMap(guid => getUnitsRecursive(state.unitsByGuid[guid], depth - 1, state))
}

function applyFilter(units: Unit[], filter: Filter, state: Portfolio): Unit[] {
  return units.filter(unit => {
    const fieldVal = unit.fieldValsByGuid[filter.fieldGuid]

    return getFieldValPrimitive(state, fieldVal) === filter.value
  })
}

function applySort(units: Unit[], sort: Sort, state: Portfolio): Unit[] {
  const mult = sort.ascending ? 1 : -1
  const fieldGuid = sort.fieldGuid
  const field = state.fieldsByGuid[fieldGuid]

  return [...units].sort((a, b) => {
    const aVal = getFieldValSortPrimitive(state, field, getActiveFieldVal(a, field))
    const bVal = getFieldValSortPrimitive(state, field, getActiveFieldVal(b, field))
    if (aVal < bVal) {
      return -1 * mult
    } else if (aVal > bVal) {
      return 1 * mult
    }
    return 0
  })
}