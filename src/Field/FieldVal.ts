export type FieldVal = UserFieldVal | NumberFieldVal | DateFieldVal | SelectFieldVal

export interface UserFieldVal { // A human being
  t: 'User'
  guid: string
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
  val: string
}