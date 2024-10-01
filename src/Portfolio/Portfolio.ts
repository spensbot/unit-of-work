import { FieldDef } from '../Field/Field'
import { View } from '../View/View'
import { Unit } from '../Unit/Unit'
import { useAppSelector } from '../app/store'

export interface Portfolio { // Collection, Domain, Portfolio, Universe
  name: string
  description: string
  rootUnits: string[]
  units: { [guid: string]: Unit }
  fieldDefs: { [name: string]: FieldDef | undefined }
  layerNames: string[]
  views: View[]
  viewUnits: string[]
}

export function newPortfolio(): Portfolio {
  return {
    name: 'My Portfolio',
    description: 'Welcome to your portfolio! Add units of work to get started!',
    rootUnits: [],
    units: {},
    fieldDefs: {},
    layerNames: [],
    views: [],
    viewUnits: []
  }
}

export function useActivePortfolio<T>(cb: (portfolio: Portfolio) => T): T {
  return useAppSelector(state => cb(state.portfolio))
}

export function getViewUnits(portfolio: Portfolio, view: View): string[] {
  return portfolio.rootUnits
}