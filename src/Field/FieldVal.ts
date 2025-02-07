export type FieldVal = UserFieldVal | NumberFieldVal | DateFieldVal | SelectFieldVal

export interface UserFieldVal { // A human being
  t: 'User'
  guids: WeightedSelect
}

export interface NumberFieldVal {
  t: 'Number'
  val: number
}

export interface DateFieldVal {
  t: 'Date'
  unix: number
}

export interface SelectFieldVal {
  t: 'Select'
  vals: WeightedSelect
}

// Only weight fields with limited options to limit computation
// Weighted Select numbers should sum to 1
export type WeightedSelect = { [key: string]: number }

export function primaryWeighted(select: WeightedSelect): string {
  return Object.entries(select).sort((a, b) => b[1] - a[1])[0][0]
}

export function normalizeWeighted(select: WeightedSelect): WeightedSelect {
  const sum = Object.values(select).reduce((a, b) => a + b, 0)
  const out = {} as WeightedSelect
  for (const key in select) {
    out[key] = select[key] / sum
  }
  return out
}