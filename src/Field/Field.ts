import { v4 as uuidv4 } from 'uuid';

export type Field = User | Number | Date | Select

export interface User { // A human being
  t: 'User'
  username: string
}

export interface Number {
  t: 'Number'
  val: number
}

export interface Date {
  t: 'Date'
  unix: number
}

export interface Select {
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