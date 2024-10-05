import { FieldDef } from '../Field/Field'
import { View } from '../View/View'
import { Unit } from '../Unit/Unit'
import { useAppSelector } from '../main/store'

export interface Portfolio { // Collection, Domain, Portfolio, Universe
  name: string
  description: string
  rootUnitGuids: string[]
  unitsByGuid: { [guid: string]: Unit }
  fieldDefGuids: string[]
  fieldDefsByGuid: { [guid: string]: FieldDef | undefined }
  layerNames: string[]
  viewsByGuid: { [guid: string]: View }
  activeViewGuid?: string
  activeViewUnitGuids: string[]
}

export function newPortfolio(): Portfolio {
  return {
    name: 'My Portfolio',
    description: 'Welcome to your portfolio. Add units of work to get started!',
    rootUnitGuids: [],
    unitsByGuid: {},
    fieldDefGuids: ['1', '2', '3', '4'],
    fieldDefsByGuid: {
      '1': { guid: '1', field_t: 'Select', name: 'Status' },
      '2': { guid: '2', field_t: 'Select', name: 'Project' },
      '3': { guid: '3', field_t: 'Number', name: 'Days' },
      '4': { guid: '4', field_t: 'User', name: 'Assignee' },
    },
    layerNames: [],
    viewsByGuid: {},
    activeViewUnitGuids: []
  }
}

export function useActivePortfolio<T>(cb: (portfolio: Portfolio) => T): T {
  return useAppSelector(state => cb(state.portfolio))
}