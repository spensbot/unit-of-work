import { FieldVal } from '../Field/FieldVal'
import { v4 as uuidv4 } from 'uuid';


export interface Unit { // A Unit of work
  guid: string
  parentGuid?: string
  childrenGuids: string[]
  name: string
  description: string
  fieldValsByGuid: { [fieldDefGuid: string]: FieldVal | undefined }
  // start: Date
  // end: Date
}

export function newUnit(parentGuid?: string): Unit {
  return {
    guid: uuidv4(),
    childrenGuids: [],
    name: 'My Unit',
    description: 'A description of my unit',
    fieldValsByGuid: {
      // 'Field_1': { t: 'Select', val: 'todo' },
      // 'Field_2': { t: 'Select', val: 'Solitaire' },
      // 'Field_3': { t: 'Number', val: 1 },
      // 'Field_4': { t: 'User', guid: 'User_1' },
    },
    parentGuid,
  }
}
