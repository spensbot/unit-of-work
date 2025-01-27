import { v4 as uuidV4 } from 'uuid'
import { CalcNode } from './CalculatedField/CalcNode'

interface FieldBase {
  guid: string
  name: string
  propogateDown?: PropogateDownStrategy
}

export type Field = UserField | NumberField | DateField | SelectField | CalculatedField

export interface UserField extends FieldBase {
  t: 'UserField'
  propogateUp?: GroupStrategy
}

export interface NumberField extends FieldBase {
  t: 'NumberField'
  propogateUp?: ReduceStrategy
}

export interface DateField extends FieldBase {
  t: 'DateField'
  propogateUp?: ReduceStrategy
}

export interface SelectField extends FieldBase {
  t: 'SelectField'
  selectOptions: string[]
  propogateUp?: GroupStrategy
}

// Calculated fields cannot propogate.
// This limitation allows for a clear order of operations (propogate, then calculate)
export interface CalculatedField extends FieldBase {
  t: 'CalculatedField'
  node: CalcNode<string> // <-- string is field guid
  propogateUp?: undefined
}

export type PropogateDownStrategy = 'Inherit' // <-- Give children the same value as the nearest explicit parent

export type GroupStrategy = {
  t: 'Group',
  weightFieldGuid?: string
}

export interface ReduceStrategy { // Combine all children values into a single value
  t: 'Reduce',
  func: 'Sum' | 'Max' | 'Min'
}

export const field_ts: Field['t'][] = ['UserField', 'NumberField', 'DateField', 'SelectField', 'CalculatedField'] as const

function base() {
  return {
    guid: uuidV4(),
    name: 'Field Name'
  }
}

export function newSelectField(): SelectField {
  return { ...base(), t: 'SelectField', selectOptions: [] }
}

export function newNumberField(): NumberField {
  return { ...base(), t: 'NumberField' }
}

export function newDateField(): DateField {
  return { ...base(), t: 'DateField' }
}

export function newUserField(): UserField {
  return { ...base(), t: 'UserField' }
}

export function newCalculateField(): CalculatedField {
  return {
    guid: uuidV4(),
    name: 'Field Name',
    t: 'CalculatedField',
    node: { t: 'BinaryOp', op: '+', left: { t: 'NumberSource' }, right: { t: 'NumberSource' } }
  }
}