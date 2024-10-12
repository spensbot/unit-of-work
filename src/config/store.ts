import { combineReducers, configureStore, PayloadAction, Reducer } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { portfolioReducer } from '../Portfolio/portfolioSlice'

const baseReducer = combineReducers({
  portfolio: portfolioReducer
})

export type RootState = ReturnType<typeof baseReducer>

const RESET_STATE = 'RESET_STATE'

export function resetState(newState: RootState) {
  return {
    type: RESET_STATE,
    payload: newState
  }
}

const rootReducer: Reducer<RootState, PayloadAction<any>> = (state, action) => {
  if (action.type === RESET_STATE) {
    return {
      ...state,
      ...action.payload
    }
  }
  return baseReducer(state, action)
}

export const store = configureStore({
  reducer: rootReducer
})

export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
