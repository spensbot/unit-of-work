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

export type Fields = { [name: string]: Field | undefined }

export interface FieldDef {
  t: 'FieldDef'
  field_t: Field["t"]
  name: string
  childBehavior: 'accumulate' | 'inherit' | 'none'
}
