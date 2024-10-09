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
  group?: GroupDef
  filter?: FilterDef
  sort?: SortDef
  depth: number // Determines how many levels of children to show
}

export interface ByField {
  fieldDef: FieldDef
}

export interface ByParent {
  parentGuid: string
}

export type By = ByField | ByParent

export interface GroupDef {
  fieldGuid: string
}

export interface FilterDef {
  fieldGuid: string
}

export interface SortDef {
  fieldGuid: string
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