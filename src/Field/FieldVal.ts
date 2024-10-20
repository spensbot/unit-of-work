import * as f from '../util/functional'

export type FieldVal = UserFieldVal | NumberFieldVal | DateFieldVal | SelectFieldVal

interface FieldValBase<T> {
  explicit?: T,
  calculated?: T
}

export interface UserFieldVal extends FieldValBase<WeightedSelect> { // A human being
  t: 'User'
}

export interface NumberFieldVal extends FieldValBase<number> {
  t: 'Number'
}

// Unix timestamp
export interface DateFieldVal extends FieldValBase<number> {
  t: 'Date'
}

export interface SelectFieldVal extends FieldValBase<WeightedSelect> {
  t: 'Select'
}

export function activeVal<T>(val: FieldValBase<T> | undefined): T | undefined {
  if (val === undefined) return undefined
  return val.explicit ?? val.calculated
}

export function getOverwrite<T>(val: FieldValBase<T> | undefined): T | undefined {
  if (val === undefined) return undefined

  if (val.explicit !== undefined && val.calculated !== undefined) {
    return val.explicit
  }
}

// Only weight fields with limited options to limit computation
// Weighted Select numbers should sum to 1
export type WeightedSelect = { [key: string]: number }

export function primaryWeighted(select: WeightedSelect): string {
  return Object.entries(select).sort((a, b) => b[1] - a[1])[0][0]
}