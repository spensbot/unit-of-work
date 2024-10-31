import { Portfolio } from "../Portfolio/Portfolio"
import { Unit } from "../Unit/Unit"
import { Field, ReduceStrategy, } from "./Field"
import { FieldVal, SelectFieldVal, UserFieldVal, NumberFieldVal, WeightedSelect } from "./FieldVal"
import { getActiveFieldValT } from "./getFieldVal"
import * as f from '../util/functional'

type ReduceFunctionMap<T> = { [key in ReduceStrategy['func']]: (a: T, b: T) => T }

const number: ReduceFunctionMap<number> = {
  Sum: (a, b) => a + b,
  Max: (a, b) => Math.max(a, b),
  Min: (a, b) => Math.min(a, b)
}

function select(selects: WeightedSelect[], weights: number[]): WeightedSelect {
  const normalizedWeights = normalizeWeights(weights)

  const out: WeightedSelect = {}

  selects.forEach((select, i) => {
    for (const key in select) {
      if (out[key] === undefined) {
        out[key] = select[key] * normalizedWeights[i]
      } else {
        out[key] += select[key] * normalizedWeights[i]
      }
    }
  })

  return out
}

function normalizeWeights(weights: number[]): number[] {
  const weightSum = weights.reduce((a, b) => a + b, 0)
  return weights.map((w) => w / weightSum)
}

export function reduceFieldVals(field: Field, fieldValsIn: [FieldVal, number][]): FieldVal | undefined {
  if (fieldValsIn.length < 1) return undefined

  if (field.propogateUp?.t === 'Group' && field.t === 'SelectField') {
    const fieldVals = fieldValsIn as [SelectFieldVal, number][]
    return {
      t: 'Select',
      vals: select(fieldVals.map(([f, _]) => f.vals), fieldVals.map(([_, weight]) => weight))
    }
  }

  if (field.propogateUp?.t === 'Group' && field.t === 'UserField') {
    const fieldVals = fieldValsIn as [UserFieldVal, number][]
    return {
      t: 'User',
      guids: select(fieldVals.map(([f, _]) => f.guids), fieldVals.map(([_, weight]) => weight))
    }
  }

  if (field.propogateUp?.t === 'Reduce' && field.t === 'NumberField') {
    // TODO: Fix this to prevent bad fieldVal types
    const func = number[field.propogateUp.func]
    return reduceFields(fieldValsIn.map(([val, _]) => val) as NumberFieldVal[], n => n.val, func, n => ({ t: 'Number', val: n }))
  }
}

function reduceFields<T, U>(fields: T[], unwrap: (field: T) => U, merge: (a: U, b: U) => U, wrap: (u: U) => T): T {
  const first = fields[0]
  const rest = fields.slice(1)
  const reduced = rest.reduce((acc, field) => {
    const unwrapped = unwrap(field)
    return merge(acc, unwrapped)
  }, unwrap(first))
  return wrap(reduced)
}