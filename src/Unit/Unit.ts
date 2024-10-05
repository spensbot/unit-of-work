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
      '1': { t: 'Select', val: 'todo' },
      '2': { t: 'Select', val: 'Solitaire' },
      '3': { t: 'Number', val: 1 },
      '4': { t: 'User', username: 'Spenser' },
    }
  }
}
