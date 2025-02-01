import { Unit } from "../Unit/Unit";
import { Portfolio } from "./Portfolio";

export default function getMaxDepth(state: Portfolio) {
  return getMaxDepthRecursive(state.rootUnitGuids.map(guid => state.unitsByGuid[guid]), state)
}

function getMaxDepthRecursive(units: Unit[], state: Portfolio): number {
  return units.reduce((maxDepth, unit) => {
    const depth = getMaxDepthRecursive(unit.childrenGuids.map(guid => state.unitsByGuid[guid]), state) + 1
    return depth > maxDepth ? depth : maxDepth
  }, 0)
}

export function getUnitDepth(unitGuid: string, portfolio: Portfolio): number {
  const unit = portfolio.unitsByGuid[unitGuid]
  if (unit.parentGuid === undefined) {
    return 0
  } else {
    return 1 + getUnitDepth(unit.parentGuid, portfolio)
  }
}
