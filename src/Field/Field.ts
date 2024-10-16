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
  propogateUp?: PropogateUpStrategy<number>
}

export interface DateField extends FieldBase {
  t: 'DateField'
  propogateUp?: PropogateUpStrategy<Date>
}

export interface SelectField extends FieldBase {
  t: 'SelectField'
  selectOptions: string[]
  propogateUp?: GroupStrategy
}

export type PropogateDownStrategy = 'Inherit' // <-- Give children the same value as the nearest explicit parent

export type PropogateUpStrategy<T> = AggregateStrategy<T> | GroupStrategy

export interface AggregateStrategy<T> { // Combine all children values into a single value
  t: 'AggregateStrategy',
  merge: (a: T, b: T) => T
}

export interface GroupStrategy { // Combine all children values into a map<T, weight>
  t: 'GroupStrategy',
  weightFieldGuid?: string // 
}