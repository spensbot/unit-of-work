import { Unit } from "../Unit/Unit";
import getActiveViewUnitGuids from "../View/getActiveViewUnitGuids";
import { Portfolio } from "./Portfolio";
import * as f from '../util/functional'
import { Field } from "../Field/Field";
import { eqDeepSimple } from "../util/util";
import { getActiveFieldValT } from "../Field/getFieldVal"
import { reduceFieldVals } from "../Field/reduceFunctions";
import { FieldVal, NumberFieldVal } from "../Field/FieldVal";
import getActiveViewGrouping from "../View/getActiveViewGrouping";


export default function updatePortfolio(portfolio: Portfolio) {
  propogateFieldVals(portfolio)

  const newGuids = getActiveViewUnitGuids(portfolio)
  if (!eqDeepSimple(portfolio.activeViewUnitGuids, newGuids)) {
    portfolio.activeViewUnitGuids = newGuids
  }

  const newGrouping = getActiveViewGrouping(portfolio)
  if (!eqDeepSimple(portfolio.activeViewGrouping, newGrouping)) {
    portfolio.activeViewGrouping = newGrouping
  }
}

function propogateFieldVals(portfolio: Portfolio) {
  const fields = portfolio.fieldGuids.map(guid => portfolio.fieldsByGuid[guid])

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
  const weightField = f.map(weightFieldGuid, guid => portfolio.fieldsByGuid[guid])
  const numberFieldVal = f.map(weightField, wf => getActiveFieldValT<NumberFieldVal>(child, wf, 'Number'))
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