import { FieldDef } from '../Field/Field'
import { View } from '../View/View'
import { Unit } from '../Unit/Unit'
import { useAppSelector } from '../config/store'
import { User } from '../User/User'

export interface Portfolio { // Collection, Domain, Portfolio, Universe
  name: string
  description: string
  rootUnitGuids: string[]
  unitsByGuid: { [guid: string]: Unit }
  fieldDefGuids: string[]
  fieldDefsByGuid: { [guid: string]: FieldDef | undefined }
  layerNames: string[]
  viewGuids: string[]
  viewsByGuid: { [guid: string]: View }
  activeViewGuid: string
  activeViewUnitGuids: string[]
  usersByGuid: { [guid: string]: User }
}

export function newPortfolio(): Portfolio {
  return {
    name: 'My Portfolio',
    description: 'Welcome to your portfolio. Add units of work to get started!',
    rootUnitGuids: [],
    unitsByGuid: {},
    fieldDefGuids: ['Field_1', 'Field_2', 'Field_3', 'Field_4'],
    fieldDefsByGuid: {
      'Field_1': { guid: 'Field_1', t: 'Select', name: 'Status', selectOptions: ['todo', 'in-progress', 'complete'] },
      'Field_2': { guid: 'Field_2', t: 'Select', name: 'Project', selectOptions: ['Solitaire', 'Sudoku', 'BrainBridge'] },
      'Field_3': { guid: 'Field_3', t: 'Number', name: 'Days' },
      'Field_4': { guid: 'Field_4', t: 'User', name: 'Assignee' },
    },
    layerNames: [],
    viewGuids: ['View_1', 'View_2', 'View_3'],
    viewsByGuid: {
      'View_1': { guid: 'View_1', mode: 'table', name: 'Everything' },
      'View_2': { guid: 'View_2', mode: 'table', name: 'Solitaire Work' },
      'View_3': { guid: 'View_3', mode: 'table', name: 'Cross-App Work' },
    },
    activeViewGuid: 'View_1',
    activeViewUnitGuids: [],
    usersByGuid: {}
  }
}

export function useActivePortfolio<T>(cb: (portfolio: Portfolio) => T): T {
  return useAppSelector(state => cb(state.portfolio))
}