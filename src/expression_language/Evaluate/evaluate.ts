import { Node } from '../Node/Node'
import { operators } from '../Token/Operator'

export default function evaluate(node: Node, context: any): any {
  switch (node.t) {
    case 'Num':
      return node.val
    case 'Str':
      return node.val
    case 'Bool':
      return node.val
    case 'Id':
      // TODO: This won't work when evaluating . operators
      return context[node.val]
    case 'BinaryOp':
      if (node.op === '.' && node.right.t === 'Id') {
        return evaluate(node.left, context)[node.right.val]
      }
      return operators[node.op](evaluate(node.left, context), evaluate(node.right, context))
    case 'UnaryOp':
      return operators['!'](evaluate(node.operand, context))
  }
}