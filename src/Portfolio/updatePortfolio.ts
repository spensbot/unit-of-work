import { Unit } from "../Unit/Unit";
import getActiveViewUnitGuids from "../View/getActiveViewUnitGuids";
import { Portfolio } from "./Portfolio";
import * as f from '../util/functional'
import { Field } from "../Field/Field";
import { eqDeepSimple } from "../util/util";
import { getActiveFieldVal, getActiveFieldValT } from "../Field/getFieldVal"
import * as reduce from '../Field/reduceFunctions'
import { FieldVal, NumberFieldVal } from "../Field/FieldVal";


export default function updatePortfolio(portfolio: Portfolio) {
  propogateFieldVals(portfolio)

  const newGuids = getActiveViewUnitGuids(portfolio)
  if (!eqDeepSimple(portfolio.activeViewUnitGuids, newGuids)) {
    portfolio.activeViewUnitGuids = newGuids
  }
}

function propogateFieldVals(portfolio: Portfolio) {
  portfolio.fieldGuids.forEach(fieldGuid => {
    const field = portfolio.fieldsByGuid[fieldGuid]
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
    .map(child => propogateRecursive(field, child, portfolio, passDown))
    .filter(passUp => passUp !== undefined)

  const passUp = (field.propogateUp === undefined && inherit === undefined) ? undefined : reducePassUps(field, unit, passUps)

  const calculated = inherit ?? passUp
  setCalculatedIfChanged(field, unit, calculated)

  return explicit ?? passUp
}

function reducePassUps(field: Field, unit: Unit, passUpsIn: FieldVal[]): FieldVal | undefined {
  if (passUpsIn.length < 1) return undefined
  if (field.propogateUp?.t === 'Reduce' && field.t === 'NumberField') {
    // TODO: Fix this
    const passUps = passUpsIn as NumberFieldVal[]
    const first = passUps[0]
    const rest = passUps.slice(1)
    const func = reduce.number[field.propogateUp.function]
    const reduced = rest.reduce((acc, val) => func(acc, val.val), first.val)

    return {
      t: 'Number',
      val: reduced,
    }
  }
}

function setCalculatedIfChanged(field: Field, unit: Unit, calculated: FieldVal | undefined) {
  if (unit.calculatedFieldValsByGuid === undefined) {
    unit.calculatedFieldValsByGuid = {}
  }

  if (!eqDeepSimple(unit.calculatedFieldValsByGuid[field.guid], calculated)) {
    unit.calculatedFieldValsByGuid[field.guid] = calculated
  }
}