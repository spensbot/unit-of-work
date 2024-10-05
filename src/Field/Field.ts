import { v4 as uuidv4 } from 'uuid';

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

export interface FieldDef {
  t: Field["t"]
  guid: string
  name: string
  selectOptions?: string[] // TODO: Put this on a separate type if things get too hairy
}

export function newFieldDef(): FieldDef {
  return {
    t: 'Select',
    guid: uuidv4(),
    name: 'New Field'
  }
}