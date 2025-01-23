import { RootState } from "./store";

/// Migrate potentially outdated state to the current version
export default function migrate(state: RootState) {
  if (state.portfolio.levelNames === undefined) state.portfolio.levelNames = []

  return state
}