import { Unit } from "../Unit/Unit"
import { Portfolio } from "../Portfolio/Portfolio"
import { Field } from "./Field"
import { FieldVal, NumberFieldVal } from "./FieldVal"

export interface FieldValInfo {
  explicit: FieldVal | undefined
  calculated: FieldVal | undefined
}

// export function getExplicitFieldVal<T extends FieldVal>(unit: Unit, field: Field, t: T['t']): T | undefined {
//   const val = unit.fieldValsByGuid[field.guid]
//   return (val?.t === t ? val : undefined) as T | undefined
// }

// export function getCalculatedFieldVal<T extends FieldVal>(unit: Unit, field: Field, portfolio: Portfolio, t: T['t']): T | undefined {
//   const val = getCalculatedFieldValUntyped(unit, field, portfolio)
//   return (val?.t === t ? val : undefined) as T | undefined
// }

// function getCalculatedFieldValUntyped(unit: Unit, field: Field, portfolio: Portfolio): FieldVal | undefined {
//   switch (field.t) {
//     case 'UserField':
//       return getInheritedField(unit, field, portfolio)
//     case 'NumberField':
//       return getAggregatedField(unit, field, portfolio, getNumberFieldVal, addNumberFieldVals)
//     case 'DateField':
//       return getInheritedField(unit, field, portfolio)
//     case 'SelectField':
//       return getInheritedField(unit, field, portfolio)
//   }
// }

// function getInheritedField(unit: Unit, field: Field, portfolio: Portfolio): FieldVal | undefined {
//   if (unit.parentGuid === undefined) return undefined

//   const parent = portfolio.unitsByGuid[unit.parentGuid]
//   const parentField = parent.fieldValsByGuid[field.guid]
//   if (parentField !== undefined) return parentField

//   return getInheritedField(parent, field, portfolio)
// }

// function getNumberFieldVal(val: FieldVal): NumberFieldVal | undefined {
//   if (val.t === 'Number') return val
// }

// function addNumberFieldVals(a: NumberFieldVal, b: NumberFieldVal): NumberFieldVal {
//   return {
//     t: 'Number',
//     val: a.val + b.val,
//   }
// }

// function getAggregatedField<Val extends FieldVal>(
//   unit: Unit,
//   field: Field,
//   portfolio: Portfolio,
//   getType: (val: FieldVal) => Val | undefined,
//   aggregate: (a: Val, b: Val) => Val
// ): Val | undefined {
//   const childFieldVals = unit.childrenGuids.map(guid => {
//     const child = portfolio.unitsByGuid[guid]
//     const childExplicitField = child.fieldValsByGuid[field.guid]
//     if (childExplicitField !== undefined) return getType(childExplicitField)
//     return getAggregatedField(child, field, portfolio, getType, aggregate)
//   }).filter(val => val !== undefined)

//   return childFieldVals.reduce<Val | undefined>((acc, val) => {
//     if (acc === undefined) return val
//     return aggregate(acc, val)
//   }, undefined)
// }