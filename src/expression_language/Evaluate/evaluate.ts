import { Node } from '../Node/Node'
import { operators, operatorTypes, TypeOfValue } from '../Token/Operator'

/* eslint @typescript-eslint/no-explicit-any: 0 */  // --> OFF

export default function evaluate(node: Node, context: any): any {
  switch (node.t) {
    case 'Num':
      return expect(node.val, 'number')
    case 'Str':
      return expect(node.val, 'string')
    case 'Bool':
      return expect(node.val, 'boolean')
    case 'Id': {
      const val = context[node.val]
      if (val === undefined) throw `${node.val} does not exist`
      return context[node.val]
    }
    case 'BinaryOp': {
      const left = evaluate(node.left, context)

      if (node.op === '.') {
        if (node.right.t !== 'Id') throw `Expected Id, got: ${node.right}`
        expect(left, 'object')
        const res = left[node.right.val]
        if (res === undefined) throw `.${node.right.val} does not exist`
        return res
      } else {
        const right = evaluate(node.right, context)
        const types = operatorTypes[node.op]
        if (types.in) {
          expect(left, types.in)
          expect(right, types.in)
        }

        const func = operators[node.op] as (left: any, right: any) => any
        return func(left, right)
      }
    }
    case 'UnaryOp':
      return operators['!'](expect(evaluate(node.operand, context), 'boolean'))
  }
}

function expect(val: any, type: TypeOfValue): any {
  if (typeof val !== type) throw `Expected ${type}, got ${typeof val} (${val})`
  return val
}