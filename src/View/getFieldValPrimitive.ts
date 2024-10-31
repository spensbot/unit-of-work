import { Portfolio } from "../Portfolio/Portfolio"
import { FieldVal, primaryWeighted } from "../Field/FieldVal"
import { Field } from "../Field/Field"

export function getFieldValPrimitive(state: Portfolio, val?: FieldVal): number | string {
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

export function getFieldValSortPrimitive(state: Portfolio, field: Field, val?: FieldVal): number | string {
  if (val === undefined) {
    if (field.t === 'NumberField' || field.t === 'DateField') return Infinity
    return 'z'
  }

  return getFieldValPrimitive(state, val)
}
