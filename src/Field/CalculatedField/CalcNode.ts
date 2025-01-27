import { map } from "../../util/functional"

/// A very simple Abstract Syntax Tree (AST) for a calculator
export type CalcNode = NumberSource | BinaryOp // Punc

export type OperatorString = '+' | '-' | '*' | '/'

export interface BinaryOp {
  t: 'BinaryOp'
  op: OperatorString
  left: CalcNode
  right: CalcNode
}

export interface NumberSource {
  t: 'NumberSource'
  guid?: string
}

export function evaluate(node: CalcNode, getVal: (t: string) => number): number | undefined {
  switch (node.t) {
    case 'NumberSource':
      return map(node.guid, getVal)
    case 'BinaryOp':
      {
        const left = evaluate(node.left, getVal)
        const right = evaluate(node.right, getVal)
        if (left === undefined || right === undefined) return undefined
        switch (node.op) {
          case '+': return left + right
          case '-': return left - right
          case '*': return left * right
          case '/': return left / right
        }
      }
  }
}