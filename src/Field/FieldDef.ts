import { v4 as uuidv4 } from 'uuid';

interface FieldDefBase {
  guid: string
  name: string
}

export type FieldDef = UserFieldDef | NumberFieldDef | DateFieldDef | SelectFieldDef

export interface UserFieldDef extends FieldDefBase {
  t: 'UserFieldDef'
}

export interface NumberFieldDef extends FieldDefBase {
  t: 'NumberFieldDef'
}

export interface DateFieldDef extends FieldDefBase {
  t: 'DateFieldDef'
}

export interface SelectFieldDef extends FieldDefBase {
  t: 'SelectFieldDef'
  selectOptions: string[] // TODO: Put this on a separate type if things get too hairy
}

export function newFieldDef(): FieldDef {
  return {
    t: 'SelectFieldDef',
    guid: uuidv4(),
    name: 'New Field',
    selectOptions: []
  }
}


// ========= Potential Future stuff ============
export type PropogationStrategy = InheritStrategy

// Top-down inheritance of field values
export interface InheritStrategy {
  t: 'InheritStrategy'
}

// Bottom-up aggregation of field values
export interface AggregateStrategy<T> {
  t: 'AggregateStrategy',
  init: T,
  merge: (accumulator: T, val: T) => T,
}