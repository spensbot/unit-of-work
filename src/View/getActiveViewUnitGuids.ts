import evaluate from "../expression_language/evaluate/evaluate"
import parse from "../expression_language/parse/parse"
import { Portfolio } from "../Portfolio/Portfolio"
import { Unit } from "../Unit/Unit"
import { Filter, Sort } from "./View"
import { FieldVal, primaryWeighted } from "../Field/FieldVal"
import { Field } from "../Field/Field"
import { getActiveFieldVal } from "../Field/getFieldVal"

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

function getUnitsRecursive(unit: Unit, depth: number, state: Portfolio): Unit[] {
  if (depth < 2) return [unit]

  return [unit, ...unit.childrenGuids.flatMap(guid => getUnitsRecursive(state.unitsByGuid[guid], depth - 1, state))]
}

function applyFilter(units: Unit[], filter: Filter, state: Portfolio): Unit[] {
  return units.filter(unit => {
    const fieldVal = unit.fieldValsByGuid[filter.fieldGuid]

    return getFieldValPrimitive(state, fieldVal) === filter.value
  })
}

function getFieldValPrimitive(state: Portfolio, val?: FieldVal): number | string {
  if (val === undefined) return 0

  switch (val.t) {
    case 'User':
      return state.usersByGuid[primaryWeighted(val.guids)].username
    case 'Date':
      return val.unix
    case 'Number':
      return val.val
    case 'Select':
      return primaryWeighted(val.vals)
  }
}

function applySort(units: Unit[], sort: Sort, state: Portfolio): Unit[] {
  const mult = sort.ascending ? 1 : -1

  return [...units].sort((a, b) => {
    const fieldGuid = sort.fieldGuid
    const field = state.fieldsByGuid[fieldGuid]
    const aVal = getSortVal(state, field, getActiveFieldVal(a, field))
    const bVal = getSortVal(state, field, getActiveFieldVal(b, field))
    if (aVal < bVal) {
      return -1 * mult
    } else if (aVal > bVal) {
      return 1 * mult
    }
    return 0
  })
}

function getSortVal(state: Portfolio, field: Field, val?: FieldVal): number | string {
  if (val === undefined) {
    if (field.t === 'NumberField' || field.t === 'DateField') return Infinity
    return 'z'
  }

  return getFieldValPrimitive(state, val)
}

// function applyGroup(units: Unit[], group: Group): Unit[] {

// }
