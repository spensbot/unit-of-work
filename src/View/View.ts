import { v4 as uuidv4 } from 'uuid';
import { useActivePortfolio } from '../Portfolio/Portfolio';

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
  weight?: WeightDef
  annotate?: AnnotateDef
  layer?: number
}

export interface GroupDef {
  field: string
}

export interface FilterDef {
  field: string
}

export interface SortDef {
  field: string
}

export interface WeightDef {
  field: string
}

export interface AnnotateDef {
  field: string
}

export const defaultView: View = newTableView('Default View')

export function newTableView(name: string): View {
  return {
    mode: 'table',
    guid: uuidv4(),
    name,
  }
}

export function useActiveView<T>(cb: (view: View) => T) {
  return useActivePortfolio(p => {
    return cb(p.activeViewGuid ? p.viewsByGuid[p.activeViewGuid] : defaultView)
  })
}