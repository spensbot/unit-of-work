import { Unit } from "../Unit/Unit";
import getActiveViewUnitGuids from "../View/getActiveViewUnitGuids";
import { Portfolio } from "./Portfolio";
import * as f from '../util/functional'
import { Field } from "../Field/Field";
import { eqDeepSimple } from "../util/util";


export default function updatePortfolio(portfolio: Portfolio) {
  propogateFieldVals(portfolio)

  const newGuids = getActiveViewUnitGuids(portfolio)
  if (!eqDeepSimple(portfolio.activeViewUnitGuids, newGuids)) {
    portfolio.activeViewUnitGuids = newGuids
  }
}

function propogateFieldVals(portfolio: Portfolio) {
  portfolio.rootUnitGuids
    .map(guid => portfolio.unitsByGuid[guid])
    .forEach(rootUnit => {
      propogateRecursive(rootUnit, portfolio)
    })
}

function propogateRecursive(unit: Unit, portfolio: Portfolio) {
  const parent = f.map(unit.parentGuid, g => portfolio.unitsByGuid[g])

  const fields: Field[] = portfolio.fieldGuids.map(g => portfolio.fieldsByGuid[g])

  // Propogate down
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
  // fields.forEach((field) => {
  //   if (field.propogateUp === 'Group') {
  //     if (field.t === 'SelectField') {

  //     }
  //     else if (field.t === 'UserField') {

  //     }
  //   }
  //   else if (field.propogateUp?.t === 'Reduce') {
  //     const weightField = f.map(field.propogateUp.weightFieldGuid, g => portfolio.fieldsByGuid[g])
  //     if (field.t === 'NumberField') {
  //       const func = reduce.number[field.propogateUp.function]
  //     } else if (field.t === 'DateField') {
  //       const func = reduce.date[field.propogateUp.function]
  //     }
  //   }
  // })
}