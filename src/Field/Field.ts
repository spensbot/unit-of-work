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
  guid: string
  field_t: Field["t"]
  name: string
}

export function newFieldDef(): FieldDef {
  return {
    guid: uuidv4(),
    field_t: 'Select',
    name: 'New Field'
  }
}