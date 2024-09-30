import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { newPortfolio } from './Portfolio'
import { newUnit } from '../Unit/Unit'

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
    // addUnit: (state) => {
    //   state.rootUnits.push(newUnit())
    // }
  }
})

export const { setName, setDescription } = portfolioSlice.actions

export const portfolioReducer = portfolioSlice.reducer
