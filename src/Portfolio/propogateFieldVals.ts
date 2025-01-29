import { Portfolio } from "./Portfolio"
import { Field } from "@/Field/Field"
import { Unit } from "@/Unit/Unit"
import { FieldVal, NumberFieldVal } from "@/Field/FieldVal"
import { getActiveFieldValT } from "@/Field/getFieldVal"
import { reduceFieldVals } from "@/Field/reduceFunctions"
import { mapUndef } from "@/util/functional"
import { eqDeepSimple } from "@/util/util"

export default function propogateFieldVals(portfolio: Portfolio) {
  const fields = portfolio.fieldGuids.map(guid => portfolio.fieldsByGuid[guid]).filter(f => f !== undefined)

  // Propogate number fields first for weighting other field's group propogation.
  propogateFieldValsOfFields(portfolio, fields.filter(field => field.t === 'NumberField'))
  propogateFieldValsOfFields(portfolio, fields.filter(field => field.t !== 'NumberField'))
}

function propogateFieldValsOfFields(portfolio: Portfolio, fields: Field[]) {
  fields.forEach(field => {
    portfolio.rootUnitGuids.forEach(rootUnitGuid => {
      const rootUnit = portfolio.unitsByGuid[rootUnitGuid]
      propogateRecursive(field, rootUnit, portfolio)
    })
  })
}

// Returns: The value being propogated up
function propogateRecursive(field: Field, unit: Unit, portfolio: Portfolio, inherit?: FieldVal): FieldVal | undefined {
  const explicit = unit.fieldValsByGuid[field.guid]
  const passDown = (field.propogateDown !== undefined) ? explicit ?? inherit : undefined

  const children: Unit[] = unit.childrenGuids.map(guid => portfolio.unitsByGuid[guid])
  const passUps = children
    .map<[FieldVal | undefined, number]>(child => [
      propogateRecursive(field, child, portfolio, passDown),
      getWeight(child, field, portfolio)
    ])
    .filter(passUp => passUp[0] !== undefined) as [FieldVal, number][]

  const passUp = (field.propogateUp === undefined && inherit === undefined) ? undefined : reduceFieldVals(field, passUps)

  const calculated = inherit ?? passUp
  setCalculatedIfChanged(field, unit, calculated)

  return explicit ?? passUp
}

function getWeight(child: Unit, field: Field, portfolio: Portfolio): number {
  const weightFieldGuid = field.propogateUp?.t === 'Group' ? field.propogateUp.weightFieldGuid : undefined
  const weightField = mapUndef(weightFieldGuid, guid => portfolio.fieldsByGuid[guid])
  const numberFieldVal = mapUndef(weightField, wf => getActiveFieldValT<NumberFieldVal>(child, wf, 'Number'))
  return numberFieldVal?.val ?? 0
}

function setCalculatedIfChanged(field: Field, unit: Unit, calculated: FieldVal | undefined) {
  if (unit.calculatedFieldValsByGuid === undefined) {
    unit.calculatedFieldValsByGuid = {}
  }

  if (!eqDeepSimple(unit.calculatedFieldValsByGuid[field.guid], calculated)) {
    unit.calculatedFieldValsByGuid[field.guid] = calculated
  }
}