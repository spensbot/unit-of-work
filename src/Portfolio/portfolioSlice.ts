import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { newPortfolio, Portfolio, getViewUnits } from './Portfolio'
import { newUnit } from '../Unit/Unit'

function updateViewUnits(portfolio: Portfolio) {
  portfolio.viewUnits = getViewUnits(portfolio, portfolio.views[0])
}

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState: newPortfolio(),
  reducers: {
    setName: (state, { payload }: PayloadAction<string>) => {
      state.name = payload
    },
    setDescription: (state, { payload }: PayloadAction<string>) => {
      state.description = payload
    },
    addUnit: (state) => {
      const unit = newUnit()
      state.units[unit.guid] = unit
      state.rootUnits.push(unit.guid)
      updateViewUnits(state)
    },
    setUnitName: (state, { payload }: PayloadAction<{ guid: string, name: string }>) => {
      state.units[payload.guid].name = payload.name
    }
  }
})

export const { setName, setDescription, addUnit, setUnitName } = portfolioSlice.actions

export const portfolioReducer = portfolioSlice.reducer
