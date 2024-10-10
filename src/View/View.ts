import { v4 as uuidv4 } from 'uuid';
import { useActivePortfolio } from '../Portfolio/Portfolio';
import { FieldDef } from '../Field/FieldDef';

/**
 * Allows users to view the portfolio's units in a specified way
 */
export interface View {
  mode: 'table' | 'kanban' | 'map'
  guid: string
  name: string
  group?: Group
  filter?: Filter
  sort?: Sort
  depth: number // Determines how many levels of children to show
}

export interface ByField {
  t: 'ByField'
  fieldDefGuid: string
}

export interface ByParent {
  t: 'ByParent'
  parentGuid: string
}

export type By = ByField | ByParent

export interface Group {
  by: By
}

export interface Filter {
  by: By
  value: string
  op: 'eq' | 'ne'
}

export interface Sort {
  by: By
  ascending: boolean
}

export const defaultView: View = newTableView('Default View')

export function newTableView(name: string): View {
  return {
    mode: 'table',
    guid: uuidv4(),
    name,
    depth: 0
  }
}

export function useActiveView<T>(cb: (view: View) => T) {
  return useActivePortfolio(p => {
    return cb(p.activeViewGuid ? p.viewsByGuid[p.activeViewGuid] : defaultView)
  })
}