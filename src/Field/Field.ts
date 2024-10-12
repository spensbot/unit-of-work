import { v4 as uuidv4 } from 'uuid';

interface FieldBase {
  guid: string
  name: string
}

export type Field = UserField | NumberField | DateField | SelectField

export interface UserField extends FieldBase {
  t: 'UserField'
}

export interface NumberField extends FieldBase {
  t: 'NumberField'
}

export interface DateField extends FieldBase {
  t: 'DateField'
}

export interface SelectField extends FieldBase {
  t: 'SelectField'
  selectOptions: string[] // TODO: Put this on a separate type if things get too hairy
}

export function newField(): Field {
  return {
    t: 'SelectField',
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