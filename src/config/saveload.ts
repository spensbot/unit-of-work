import { resetState, store } from "./store"

const KEY = "store"

export function beginSaveLoad() {
  store.subscribe(() => {
    localStorage.setItem(KEY, JSON.stringify(store.getState()))
  })

  const existingState = localStorage.getItem(KEY)
  if (existingState) {
    store.dispatch(resetState(JSON.parse(existingState)))
  }
}