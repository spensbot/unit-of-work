import { FieldDef } from '../Field/Field'
import { View } from '../View/View'
import { useAppSelector } from '../app/store'

export interface Portfolio { // Collection, Domain, Portfolio, Universe
  name: string
  description: string
  rootUnitGuids: string[]
  fieldDefs: { [name: string]: FieldDef | undefined }
  layerNames: string[]
  views: View[]
}

export function newPortfolio(): Portfolio {
  return {
    name: 'My Portfolio',
    description: 'Welcome to your portfolio! Add units of work to get started!',
    rootUnitGuids: [],
    fieldDefs: {},
    layerNames: [],
    views: []
  }
}

export function useActivePortfolio<T>(cb: (portfolio: Portfolio) => T): T {
  return useAppSelector(state => cb(state.portfolio))
}