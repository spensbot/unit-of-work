import { FieldVal } from '../Field/FieldVal'
import { v4 as uuidv4 } from 'uuid';

export interface Unit { // A Unit of work
  guid: string
  parentGuid?: string
  childrenGuids: string[]
  name: string
  description: string
  fieldValsByGuid: { [fieldDefGuid: string]: FieldVal | undefined }
}

export function newUnit(parentGuid?: string): Unit {
  return {
    guid: uuidv4(),
    childrenGuids: [],
    name: '',
    description: '',
    fieldValsByGuid: {},
    parentGuid,
  }
}
