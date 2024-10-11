import { parseBool } from "../Node/Bool";
import { Node, parseSimpleNode } from "../Node/Node";
import { operatorPrecedence } from "../Token/Operator";
import TokenStream from "./TokenStream";


export default function parse(input: string): Node {
  return parseNode(new TokenStream(input))
}

function parseNode(ts: TokenStream): Node {
  const node =
    parseParenthesis(ts)
    ?? parseSimpleNode(ts)
    ?? parseBool(ts)
    ?? parseUnaryOp(ts)

  if (node) return parseBinaryOp(ts, node, 0)

  throw ts.error('Unexpected token: ' + JSON.stringify(ts.peek()))
}

function parseUnaryOp(ts: TokenStream): Node | undefined {
  const tk = ts.peek()

  if (tk?.t === 'Op' && tk.val === '!') {
    ts.next()
    return {
      t: 'UnaryOp',
      op: tk.val,
      right: parseNode(ts)
    }
  }
}

function parseParenthesis(ts: TokenStream): Node | undefined {
  if (ts.is('Punc', '(')) {
    ts.next()
    const node = parseNode(ts)
    ts.skip('Punc', ')')
    return node
  }
}

function parseBinaryOp(ts: TokenStream, left: Node, leftPrecedence: number): Node {
  const tk = ts.peek()

  if (tk?.t === 'Op' && tk.val !== '!') {
    const rightPrecedence = operatorPrecedence[tk.val]
    if (rightPrecedence > leftPrecedence) {
      ts.next()
      return parseBinaryOp(ts, {
        t: 'BinaryOp',
        left,
        op: tk.val,
        right: parseBinaryOp(ts, parseNode(ts), rightPrecedence)
      }, leftPrecedence)
    }
  }

  return left
}

// function parseBinaryOp(ts: TokenStream, left: Node, precedence: number): Node {
//   var tk = ts.peek()
//   if (tk?.t === 'Op') {
//     var nextPrecedence = operatorPrecedence[tk.value]
//     if (nextPrecedence < precedence) {
//       ts.next()
//       const right = parseBinaryOp(ts, parseNode(ts), nextPrecedence)
//       return parseBinaryOp(ts, {
//         t: 'BinaryOp',
//         operator: tk.value,
//         left,
//         right
//       }, precedence)
//     }
//   }
//   return left
// }