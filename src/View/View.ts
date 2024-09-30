/**
 * Allows users to view the portfolio's units in a specified way
 */
export interface View {
  mode: 'kanban' | 'table' | 'map'
  name: string
  description: string
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