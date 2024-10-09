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
  layerMin?: number
  layerMax?: number
}

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
  }
}

export function useActiveView<T>(cb: (view: View) => T) {
  return useActivePortfolio(p => {
    return cb(p.activeViewGuid ? p.viewsByGuid[p.activeViewGuid] : defaultView)
  })
}