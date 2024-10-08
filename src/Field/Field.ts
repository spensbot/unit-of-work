export type Field = UserField | NumberField | DateField | SelectField

export interface UserField { // A human being
  t: 'User'
  guid: string
}

export interface NumberField {
  t: 'Number'
  val: number
}


export interface DateField {
  t: 'Date'
  unix: number
}

export interface SelectField {
  t: 'Select'
  val: string
}