import { FieldVal } from '../Field/FieldVal'
import { Field } from '../Field/Field'
import { uowGuid } from '../util/guid'

export type FieldValMap = { [fieldGuid: string]: FieldVal | undefined }

export interface Unit { // A Unit of work
  t: 'Unit'
  guid: string
  parentGuid?: string
  childrenGuids: string[]
  name: string
  description: string
  fieldValsByGuid: FieldValMap
  calculatedFieldValsByGuid?: FieldValMap // Calculated client-side. Never saved to server
}

export function newUnit(parentGuid?: string): Unit {
  return {
    t: 'Unit',
    guid: uowGuid(),
    childrenGuids: [],
    name: '',
    description: '',
    fieldValsByGuid: {},
    parentGuid,
  }
}
