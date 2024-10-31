import { FieldVal } from '../Field/FieldVal'
import { Field } from '../Field/Field'
import { v4 as uuidv4 } from 'uuid';

export type FieldValMap = { [fieldDefGuid: string]: FieldVal | undefined }

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
    guid: uuidv4(),
    childrenGuids: [],
    name: '',
    description: '',
    fieldValsByGuid: {},
    parentGuid,
  }
}
