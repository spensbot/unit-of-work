import { parseBool } from "../Node/Bool";
import { Node, parseSimpleNode } from "../Node/Node";
import { operatorPrecedence } from "../Token/Operator";
import TokenStream from "./TokenStream";


export default function parse(input: string): Node {
  return parseNode(new TokenStream(input))
}

function parseNode(ts: TokenStream): Node {
  return parseBinaryOp(ts, parseAtom(ts), 0)
}

function parseAtom(ts: TokenStream): Node {
  if (ts.is('Punc', '(')) {
    ts.next()
    const node = parseNode(ts)
    ts.skip('Punc', ')')
    return node
  }

  const node = parseUnaryOp(ts)
    ?? parseSimpleNode(ts)
    ?? parseBool(ts)

  if (node) return node

  throw ts.error('Unexpected token: ' + JSON.stringify(ts.peek()))
}

function parseUnaryOp(ts: TokenStream): Node | undefined {
  const tk = ts.peek()

  if (tk?.t === 'Op' && tk.val === '!') {
    ts.next()
    return {
      t: 'UnaryOp',
      op: tk.val,
      operand: parseAtom(ts)
    }
  }
}

function parseBinaryOp(ts: TokenStream, left: Node, currentPrecedence: number): Node {
  const tk = ts.peek()

  if (tk?.t === 'Op' && tk.val !== '!') {
    const precedence = operatorPrecedence[tk.val]
    if (precedence > currentPrecedence) {
      ts.next()
      return parseBinaryOp(ts, {
        t: 'BinaryOp',
        left,
        op: tk.val,
        right: parseBinaryOp(ts, parseAtom(ts), precedence)
      }, currentPrecedence)
    }
  }

  return left
}