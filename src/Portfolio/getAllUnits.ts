import { Unit } from "@/Unit/Unit";
import { Portfolio } from "./Portfolio";

export default function getAllUnits(state: Portfolio): Unit[] {
  return state.rootUnitGuids.map(guid => getUnitsRecursive(state.unitsByGuid[guid], state)).flat(1);
}

// Returns the unit and all it's children, recursively.
function getUnitsRecursive(unit: Unit, state: Portfolio): Unit[] {
  return [unit, ...unit.childrenGuids.map(guid => getUnitsRecursive(state.unitsByGuid[guid], state)).flat(1)];
}
