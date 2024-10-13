import { Unit } from "../Unit/Unit";
import { Portfolio } from "./Portfolio";

export default function getMaxDepth(state: Portfolio) {
  console.log(state.viewsByGuid[state.activeViewGuid])

  return getMaxDepthRecursive(state.rootUnitGuids.map(guid => state.unitsByGuid[guid]), state)
}

function getMaxDepthRecursive(units: Unit[], state: Portfolio): number {
  return units.reduce((maxDepth, unit) => {
    const depth = getMaxDepthRecursive(unit.childrenGuids.map(guid => state.unitsByGuid[guid]), state) + 1
    return depth > maxDepth ? depth : maxDepth
  }, 0)
}