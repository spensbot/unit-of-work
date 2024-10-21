interface FieldBase {
  guid: string
  name: string
  propogateDown?: PropogateDownStrategy
}

export type Field = UserField | NumberField | DateField | SelectField

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

export type PropogateDownStrategy = 'Inherit' // <-- Give children the same value as the nearest explicit parent

export type GroupStrategy = {
  t: 'Group',
  weightFieldGuid?: string
}

export interface ReduceStrategy { // Combine all children values into a single value
  t: 'Reduce',
  function: 'Sum' | 'Max' | 'Min'
}