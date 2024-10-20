import evaluate from "../expression_language/evaluate/evaluate"
import parse from "../expression_language/parse/parse"
import { Portfolio } from "../Portfolio/Portfolio"
import { Unit } from "../Unit/Unit"
import { Filter, Sort } from "./View"
import { activeVal, FieldVal, primaryWeighted } from "../Field/FieldVal"
import * as f from '../util/functional'

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
  try {
    const ast = parse(filter.expression)
    return units.filter(u => {
      const context: { [key: string]: any } = {
        name: u.name,
        description: u.description,
      }
      for (const fieldGuid in u.fieldValsByGuid) {
        const field = state.fieldsByGuid[fieldGuid]
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
      return f.map(activeVal(val), v => state.usersByGuid[primaryWeighted(v)].username) ?? 0
    case 'Date':
      return activeVal(val) ?? 0
    case 'Number':
      return activeVal(val) ?? 0
    case 'Select':
      return f.map(activeVal(val), v => primaryWeighted(v)) ?? 0
  }
}

function applySort(units: Unit[], sort: Sort, state: Portfolio): Unit[] {
  return [...units].sort((a, b) => {
    const fieldGuid = sort.fieldGuid
    const aVal = getSortVal(state, fieldGuid, a.fieldValsByGuid[sort.fieldGuid])
    const bVal = getSortVal(state, fieldGuid, b.fieldValsByGuid[sort.fieldGuid])
    if (aVal < bVal) {
      return -1
    } else if (aVal > bVal) {
      return 1
    }
    return 0
  })
}

function getSortVal(state: Portfolio, fieldGuid: string, val?: FieldVal): number | string {
  if (val === undefined) {
    const field = state.fieldsByGuid[fieldGuid]
    if (field.t === 'NumberField' || field.t === 'DateField') return Infinity
    return 'z'
  }

  return getFieldVal(state, val)
}

// function applyGroup(units: Unit[], group: Group): Unit[] {

// }
