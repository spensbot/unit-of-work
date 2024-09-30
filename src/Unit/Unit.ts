import { Fields } from '../Field/Field'
import { useActivePortfolio } from '../Portfolio/Portfolio'
import { v4 as uuidv4 } from 'uuid';


export interface Unit { // A Unit of work
  guid: string
  children: Unit[]
  name: string
  description: string
  fields: Fields
  // start: Date
  // end: Date
}

export function newUnit(): Unit {
  return {
    guid: uuidv4(),
    children: [],
    name: 'My Unit',
    description: '',
    fields: {}
  }
}

// export function useActiveUnit<T>(cb: (unit: Unit) => T): T {
//   return useActivePortfolio(portfolio => cb(portfolio.rootUnits[0]))
// }