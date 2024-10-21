import { Unit } from "../Unit/Unit";
import getActiveViewUnitGuids from "../View/getActiveViewUnitGuids";
import { Portfolio } from "./Portfolio";
import * as f from '../util/functional'
import { Field } from "../Field/Field";
import { eqDeepSimple } from "../util/util";
import { getActiveFieldValT } from "../Field/getFieldVal"
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
  portfolio.rootUnitGuids
    .map(rootUnitGuid => portfolio.unitsByGuid[rootUnitGuid])
    .forEach(rootUnit => {
      propogateRecursive(rootUnit, portfolio)
    })
}

function propogateRecursive(unit: Unit, portfolio: Portfolio) {
  const parent = f.map(unit.parentGuid, g => portfolio.unitsByGuid[g])

  const fields: Field[] = portfolio.fieldGuids.map(g => portfolio.fieldsByGuid[g])

  // Propogate down
  // top -> down, so children need to be calculated after
  fields.forEach((field) => {
    if (field.propogateDown === 'Inherit' && parent !== undefined) {
      const inherited = parent.fieldValsByGuid[field.guid] ?? parent.calculatedFieldValsByGuid?.[field.guid]

      if (!eqDeepSimple(unit.fieldValsByGuid[field.guid], inherited)) {
        if (unit.calculatedFieldValsByGuid === undefined) {
          unit.calculatedFieldValsByGuid = {}
        }
        unit.calculatedFieldValsByGuid[field.guid] = inherited
      }
    }
  })

  const children: Unit[] = unit.childrenGuids.map(guid => portfolio.unitsByGuid[guid])
  children.forEach(child => {
    propogateRecursive(child, portfolio)
  })

  // Propogate up
  // bottom -> up, so children need to be calculated first
  fields.forEach((field) => {
    if (field.propogateUp?.t === 'Group') {
      const weightField = f.map(field.propogateUp.weightFieldGuid, g => portfolio.fieldsByGuid[g])
      if (field.t === 'SelectField') {

      }
      else if (field.t === 'UserField') {

      }
    }
    else if (field.propogateUp?.t === 'Reduce') {
      if (field.t === 'NumberField') {
        const func = reduce.number[field.propogateUp.function]
        if (func === undefined) return

        console.log('func !== undefined')

        const childrenVals = children
          .map(child => getActiveFieldValT<NumberFieldVal>(child, field, 'Number'))
          .filter(child => child !== undefined)

        if (childrenVals.length < 1) return

        const first = childrenVals[0]
        const rest = childrenVals.slice(1)
        const reduced = rest.reduce((acc, val) => func(acc, val.val), first.val)

        const calculated: FieldVal = {
          t: 'Number',
          val: reduced,
        }

        console.log(reduced)

        if (!eqDeepSimple(unit.fieldValsByGuid[field.guid], calculated)) {
          if (unit.calculatedFieldValsByGuid === undefined) {
            unit.calculatedFieldValsByGuid = {}
          }
          unit.calculatedFieldValsByGuid[field.guid] = calculated
        }
      }
    }
  })
}