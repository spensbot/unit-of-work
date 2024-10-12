import { Node } from "../Node/Node";
import { operatorPrecedence } from "../Token/Operator";

export default function generate(node: Node): string {
  switch (node.t) {
    case 'Num':
      return `${node.val}`
    case 'Str':
      return `"${node.val}"`
    case 'Bool':
      return `${node.val}`
    case 'Id':
      return node.val
    case 'BinaryOp':
      // return `${generate(node.left)} ${node.op} ${generate(node.right)}`
      const p_l = getPrecedence(node.left)
      const p_op = operatorPrecedence[node.op]
      const p_r = getPrecedence(node.right)
      let left = generate(node.left)
      let right = generate(node.right)
      if (p_l < p_op)
        left = `(${left})`
      if (p_r <= p_op)
        right = `(${right})`

      return `${left} ${node.op} ${right}`
    case 'UnaryOp':
      return `${node.op}${generate(node.operand)}`
  }
}

function getPrecedence(node: Node): number {
  switch (node.t) {
    case 'BinaryOp':
      return operatorPrecedence[node.op]
    default:
      return Infinity
  }
}