import { createSlice, configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'


const exampleSlice = createSlice({
  name: 'example',
  initialState: {
    value: 0
  },
  reducers: {
    increment: state => {
      state.value += 1
    }
  }
})

export const { increment } = exampleSlice.actions

export const store = configureStore({
  reducer: {
    example: exampleSlice.reducer
  }
})

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
