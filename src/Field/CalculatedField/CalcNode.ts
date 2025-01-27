import { map } from "../../util/functional"

/// A very simple Abstract Syntax Tree (AST) for a calculator
export type CalcNode<T> = NumberSource<T> | BinaryOp<T> // Punc

export type OperatorString = '+' | '-' | '*' | '/'

export interface BinaryOp<T> {
  t: 'BinaryOp'
  op: OperatorString
  left: CalcNode<T>
  right: CalcNode<T>
}

export interface NumberSource<T> {
  t: 'NumberSource'
  source?: T
}

export function evaluate<T>(node: CalcNode<T>, getVal: (t: T) => number): number | undefined {
  switch (node.t) {
    case 'NumberSource':
      return map(node.source, getVal)
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