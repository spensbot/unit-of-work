import evaluate from "../expression_language/evaluate/evaluate"
import parse from "../expression_language/parse/parse"
import { Portfolio } from "../Portfolio/Portfolio"
import { Unit } from "../Unit/Unit"
import { Filter, Sort } from "./View"
import { FieldVal } from "../Field/FieldVal"

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
