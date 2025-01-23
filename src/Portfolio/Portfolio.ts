import { Field } from '../Field/Field'
import { View } from '../View/View'
import { Unit } from '../Unit/Unit'
import { useAppSelector } from '../config/store'
import { User } from '../User/User'
import { Grouping } from '../View/Grouping'

export interface Portfolio { // Collection, Domain, Portfolio, Universe
  name: string
  description: string
  rootUnitGuids: string[]
  activeUnitGuid?: string
  unitsByGuid: { [guid: string]: Unit }
  fieldGuids: string[]
  fieldsByGuid: { [guid: string]: Field }
  levelNames: string[]
  viewGuids: string[]
  viewsByGuid: { [guid: string]: View }
  activeViewGuid: string
  activeViewUnitGuids: string[]
  userGuids: string[]
  usersByGuid: { [guid: string]: User }
  activeViewGrouping: Grouping
}

export function newPortfolio(): Portfolio {
  return {
    name: 'My Portfolio',
    description: 'Welcome to your portfolio. Add units of work to get started!',
    rootUnitGuids: [],
    unitsByGuid: {},
    fieldGuids: ['Field_1', 'Field_2', 'Field_3', 'Field_4'],
    fieldsByGuid: {
      'Field_1': {
        guid: 'Field_1', t: 'SelectField', name: 'Status', selectOptions: ['todo', 'in-progress', 'complete'],
        propogateUp: {
          t: 'Group',
          weightFieldGuid: 'Field_3'
        }
      },
      'Field_2': { guid: 'Field_2', t: 'SelectField', name: 'Product', selectOptions: ['Solitaire', 'Sudoku', 'BrainBridge'], propogateDown: 'Inherit' },
      'Field_3': {
        guid: 'Field_3', t: 'NumberField', name: 'Days', propogateUp: {
          t: 'Reduce',
          func: 'Sum'
        }
      },
      'Field_4': {
        guid: 'Field_4', t: 'UserField', name: 'Assignee', propogateDown: 'Inherit', propogateUp: {
          t: 'Group',
          weightFieldGuid: 'Field_3'
        }
      },
      'Field_5': { guid: 'Field_5', t: 'DateField', name: 'End' },
    },
    levelNames: [],
    viewGuids: ['View_1'],
    viewsByGuid: {
      'View_1': { guid: 'View_1', mode: 'table', name: 'Everything', depth: 0 }
    },
    activeViewGuid: 'View_1',
    activeViewUnitGuids: [],
    userGuids: ['User_1', 'User_2', 'User_3'],
    usersByGuid: {
      'User_1': { guid: 'User_1', username: 'Alice', image_url: 'https://i.pravatar.cc/150?img=1' },
      'User_2': { guid: 'User_2', username: 'Bob', image_url: 'https://i.pravatar.cc/150?img=2' },
      'User_3': { guid: 'User_3', username: 'Charlie', image_url: 'https://i.pravatar.cc/150?img=6' }
    },
    activeViewGrouping: { t: 'Grouping', members: [], fieldTotalsByGuid: {} }
  }
}

export function useActivePortfolio<T>(cb: (portfolio: Portfolio) => T): T {
  return useAppSelector(state => cb(state.portfolio))
}