import { Portfolio } from "../Portfolio/Portfolio"
import { Unit } from "../Unit/Unit"
import { Filter, Sort, Group } from "./View"
import { FieldVal } from "../Field/FieldVal"
import { Field } from "../Field/Field"
import { getActiveFieldVal } from "../Field/getFieldVal"
import * as f from '../util/functional'
import { reduceFieldVals } from "../Field/reduceFunctions"
import { Grouping, MapGrouping, UnitGrouping } from "./Grouping"
import { getFieldValPrimitive, getFieldValSortPrimitive } from "./getFieldValPrimitive"

export default function getActiveViewGrouping(state: Portfolio): Grouping {
  const activeView = state.viewsByGuid[state.activeViewGuid]

  // let units = state.rootUnitGuids.map(guid => state.unitsByGuid[guid])
  let units = state.rootUnitGuids.flatMap(guid => getUnitsRecursive(state.unitsByGuid[guid], activeView.depth, state))
  // const view = state.vie wsByGuid[state.activeViewGuid]
  // TODO: Apply filter, sort, group.
  if (activeView.filter) units = applyFilter(units, activeView.filter, state)
  let unitGrouping = applyGroup(state, units, activeView.group)
  if (activeView.sort) unitGrouping = applySortToGrouping(unitGrouping, activeView.sort, state)

  return MapGrouping(unitGrouping, state)
}

// Returns the unit's children if it has any, otherwise returns the unit itself.
function getUnitsRecursive(unit: Unit, depth: number, state: Portfolio): Unit[] {
  if (depth === 1 || unit.childrenGuids.length === 0) return [unit]

  return unit.childrenGuids.flatMap(guid => getUnitsRecursive(state.unitsByGuid[guid], depth - 1, state))
}

function applyFilter(units: Unit[], filter: Filter, state: Portfolio): Unit[] {
  return units.filter(unit => {
    const fieldVal = getActiveFieldVal(unit, state.fieldsByGuid[filter.fieldGuid])

    return getFieldValPrimitive(state, fieldVal) === filter.value
  })
}


function applySortToGrouping(grouping: UnitGrouping, sort: Sort, state: Portfolio): UnitGrouping {
  const mult = sort.ascending ? 1 : -1
  const fieldGuid = sort.fieldGuid
  const field = state.fieldsByGuid[fieldGuid]

  grouping.members.sort((a, b) => {
    const aVal = (a.t === 'Unit')
      ? getFieldValSortPrimitive(state, field, getActiveFieldVal(a, field))
      : getFieldValSortPrimitive(state, field, a.fieldTotalsByGuid[fieldGuid])
    const bVal = (b.t === 'Unit')
      ? getFieldValSortPrimitive(state, field, getActiveFieldVal(b, field))
      : getFieldValSortPrimitive(state, field, b.fieldTotalsByGuid[fieldGuid])
    if (aVal < bVal) {
      return -1 * mult
    } else if (aVal > bVal) {
      return 1 * mult
    }
    return 0
  })

  grouping.members.forEach(member => {
    if (member.t === 'UnitGrouping') {
      applySortToGrouping(member, sort, state)
    }
  })

  return grouping
}

function applyGroup(state: Portfolio, units: Unit[], group?: Group): UnitGrouping {
  if (group === undefined) return {
    t: 'UnitGrouping',
    members: units,
    fieldTotalsByGuid: getFieldTotalsByGuid(state, units)
  }

  let members: (Unit | UnitGrouping)[] = []
  const field = state.fieldsByGuid[group.fieldGuid]
  const groupedUnits = f.groupByFunc(units, unit => getFieldValPrimitive(state, getActiveFieldVal(unit, field)))
  for (const key in groupedUnits) {

    const grouping: UnitGrouping = {
      t: 'UnitGrouping',
      name: key,
      members: groupedUnits[key],
      fieldTotalsByGuid: getFieldTotalsByGuid(state, groupedUnits[key])
    }
    members.push(grouping)
  }

  return {
    t: 'UnitGrouping',
    members: members,
    fieldTotalsByGuid: getFieldTotalsByGuid(state, members)
  }
}

function getFieldTotalsByGuid(state: Portfolio, items: (Unit | UnitGrouping)[]): { [fieldGuid: string]: FieldVal } {
  const fieldTotals: { [fieldGuid: string]: FieldVal } = {}
  for (const fieldGuid of state.fieldGuids) {
    const field = state.fieldsByGuid[fieldGuid]
    const val = calculateGroupingField(state, items, field)
    if (val !== undefined) fieldTotals[fieldGuid] = val
  }
  return fieldTotals
}

function calculateGroupingField(state: Portfolio, items: (Unit | UnitGrouping)[], field: Field): FieldVal | undefined {
  if (field.propogateUp) {
    const vals = items.map(item => {
      if (item.t === 'Unit') {
        return getActiveFieldVal(item, field)
      } else {
        return calculateGroupingField(state, item.members, field)
      }
    }).filter(f => f !== undefined)
    // TODO: Implement weights
    return reduceFieldVals(field, vals.map(val => [val, 1]))
  }
  return undefined
}