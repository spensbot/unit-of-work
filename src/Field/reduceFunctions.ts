import { ReduceStrategy } from "./Field"
import { WeightedSelect } from "./FieldVal"

type ReduceFunctionMap<T> = { [key in ReduceStrategy['function']]?: (a: T, b: T) => T }

export const date: ReduceFunctionMap<number> = {
  Max: (a, b) => Math.max(a, b),
  Min: (a, b) => Math.min(a, b)
}

export const number: ReduceFunctionMap<number> = {
  Sum: (a, b) => a + b,
  Max: (a, b) => Math.max(a, b),
  Min: (a, b) => Math.min(a, b)
}

export function select(selects: WeightedSelect[], weights: number[]): WeightedSelect {
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