import { Portfolio } from "../Portfolio/Portfolio"
import { Unit } from "../Unit/Unit"
import { FieldVal } from "../Field/FieldVal"

export interface Grouping {
  t: 'Grouping'
  name?: string // Root grouping has no name
  members: (string | Grouping)[]
  fieldValsByGuid: { [fieldGuid: string]: FieldVal }
}

export interface UnitGrouping {
  t: 'UnitGrouping'
  name?: string
  members: (Unit | UnitGrouping)[]
  fieldValsByGuid: { [fieldGuid: string]: FieldVal }
}

export function MapGrouping(unitGrouping: UnitGrouping, state: Portfolio): Grouping {
  return {
    t: 'Grouping',
    name: unitGrouping.name,
    members: unitGrouping.members.map(member => {
      if (member.t === 'Unit') return member.guid
      return MapGrouping(member, state)
    }),
    fieldValsByGuid: unitGrouping.fieldValsByGuid
  }
}
