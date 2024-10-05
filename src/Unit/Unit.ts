import { Fields } from '../Field/Field'
import { v4 as uuidv4 } from 'uuid';


export interface Unit { // A Unit of work
  guid: string
  childrenGuids: string[]
  name: string
  description: string
  fields: Fields
  // start: Date
  // end: Date
}

export function newUnit(): Unit {
  return {
    guid: uuidv4(),
    childrenGuids: [],
    name: 'My Unit',
    description: '',
    fields: {}
  }
}
