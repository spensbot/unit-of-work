import { v4 as uuidv4 } from 'uuid';
import { useActivePortfolio } from '../Portfolio/Portfolio';

/**
 * Allows users to view the portfolio's units in a specified way
 */
export interface View {
  mode: 'table' | 'kanban' | 'map' | 'timeline'
  guid: string
  name: string
  group?: Group
  filter?: Filter
  sort?: Sort
  depth: number // Determines how many levels of children to show
}

export type Group = {
  fieldGuid: string
}

// This filter is trash for display purposes (for now)
export interface Filter {
  fieldGuid: string
  value: string
}

export interface Sort {
  fieldGuid: string
  ascending: boolean
}

export const defaultView: View = newTableView('Default View')

export function newTableView(name: string): View {
  return {
    mode: 'table',
    guid: uuidv4(),
    name,
    depth: 1
  }
}

export function useActiveView<T>(cb: (view: View) => T) {
  return useActivePortfolio(p => {
    return cb(p.activeViewGuid ? p.viewsByGuid[p.activeViewGuid] : defaultView)
  })
}