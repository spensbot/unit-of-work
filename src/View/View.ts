import { useActivePortfolio } from '../Portfolio/Portfolio';
import { uowGuid } from '../util/guid';

/**
 * Allows users to view the portfolio's units in a specified way
 */
export interface View {
  mode: 'table' | 'kanban' | 'map' | 'timeline'
  guid: string
  name: string
  focusUnits: string[]
  filters: Filters
  sort?: Sort
  group?: Group
  depth: number // Determines how many levels of children to show
}

export type Group = {
  fieldGuid: string
}

// An array of filters applied consecutively (&&)
export type Filters = Filter[]

export type Filter = SelectFieldFilter

export interface UnitFilter {
  t: 'UnitFilter'
  unitGuids: string[] // The result is the || of each guid
}

export interface SelectFieldFilter {
  t: 'SelectFieldFilter'
  fieldGuid: string
  values: string[] // The result is the || of each value
}

export interface Sort {
  fieldGuid: string
  ascending: boolean
}

export const defaultView: View = newTableView('Default View')

export function newTableView(name: string): View {
  return {
    mode: 'table',
    guid: uowGuid(),
    name,
    depth: 1,
    filters: [],
    focusUnits: []
  }
}

export function useActiveView<T>(cb: (view: View) => T) {
  return useActivePortfolio(p => {
    return cb(p.activeViewGuid ? p.viewsByGuid[p.activeViewGuid] : defaultView)
  })
}