import { FieldDef } from '../Field/Field'
import { View } from '../View/View'
import { Unit } from '../Unit/Unit'
import { useAppSelector } from '../main/store'

export interface Portfolio { // Collection, Domain, Portfolio, Universe
  name: string
  description: string
  rootUnitGuids: string[]
  unitsByGuid: { [guid: string]: Unit }
  fieldDefsByName: { [name: string]: FieldDef | undefined }
  layerNames: string[]
  viewsByGuid: { [guid: string]: View }
  activeViewGuid?: string
  activeViewUnitGuids: string[]
}

export function newPortfolio(): Portfolio {
  return {
    name: 'My Portfolio',
    description: 'Welcome to your portfolio! Add units of work to get started!',
    rootUnitGuids: [],
    unitsByGuid: {},
    fieldDefsByName: {},
    layerNames: [],
    viewsByGuid: {},
    activeViewUnitGuids: []
  }
}

export function useActivePortfolio<T>(cb: (portfolio: Portfolio) => T): T {
  return useAppSelector(state => cb(state.portfolio))
}
