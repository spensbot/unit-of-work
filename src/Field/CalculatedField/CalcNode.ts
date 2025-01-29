import { mapUndef } from "../../util/functional"

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

export function evaluateCalcNode(node: CalcNode, getVal: (t: string) => number | undefined): number | undefined {
  switch (node.t) {
    case 'NumberSource':
      return mapUndef(node.guid, getVal)
    case 'BinaryOp':
      {
        const left = evaluateCalcNode(node.left, getVal)
        const right = evaluateCalcNode(node.right, getVal)
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