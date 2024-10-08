import { Field } from '../Field/Field'
import { v4 as uuidv4 } from 'uuid';


export interface Unit { // A Unit of work
  guid: string
  childrenGuids: string[]
  name: string
  description: string
  fieldsByDefGuid: { [name: string]: Field | undefined }
  // start: Date
  // end: Date
}

export function newUnit(): Unit {
  return {
    guid: uuidv4(),
    childrenGuids: [],
    name: 'My Unit',
    description: 'A description of my unit',
    fieldsByDefGuid: {
      // 'Field_1': { t: 'Select', val: 'todo' },
      // 'Field_2': { t: 'Select', val: 'Solitaire' },
      // 'Field_3': { t: 'Number', val: 1 },
      // 'Field_4': { t: 'User', guid: 'User_1' },
    }
  }
}
