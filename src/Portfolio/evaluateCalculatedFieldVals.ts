import getAllUnits from "./getAllUnits"
import { Portfolio } from "./Portfolio"
import { evaluateCalcNode } from "@/Field/CalculatedField/CalcNode"
import { getActiveFieldValT } from "@/Field/getFieldVal"
import { NumberFieldVal } from "@/Field/FieldVal"
import { CalculatedField } from "@/Field/Field"

export default function evaluateCalculatedFieldVals(portfolio: Portfolio) {
  getAllUnits(portfolio).forEach(unit => {
    getCalculatedFields(portfolio).forEach(calculatedField => {
      const fieldVal = evaluateCalcNode(calculatedField.node, (guid: string) => {
        const sourceField = portfolio.fieldsByGuid[guid]
        const val = getActiveFieldValT<NumberFieldVal>(unit, sourceField, 'Number')?.val
        return val
      })
      if (fieldVal !== undefined) {
        if (unit.calculatedFieldValsByGuid === undefined) {
          unit.calculatedFieldValsByGuid = {}
        }
        unit.calculatedFieldValsByGuid[calculatedField.guid] = { t: 'Number', val: fieldVal }
      }
    })
  })
}

function getCalculatedFields(portfolio: Portfolio): CalculatedField[] {
  return portfolio.fieldGuids
    .map(guid => portfolio.fieldsByGuid[guid])
    .filter(f => f?.t === 'CalculatedField')
}