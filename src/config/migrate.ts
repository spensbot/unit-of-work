import { RootState } from "./store";

/// Migrate potentially outdated state to the current version
export default function migrate(state: RootState) {
  const p = state.portfolio

  if (p.levelNames === undefined) p.levelNames = []

  p.viewGuids
    .map(id => p.viewsByGuid[id])
    .filter(v => v !== undefined)
    .forEach(v => {
      if (v.focusUnits === undefined) v.focusUnits = []
      if (v.filters === undefined) v.filters = []
    })

  return state
}