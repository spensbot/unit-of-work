import { parseBool } from "../Node/Bool";
import { Node, parseSimpleNode } from "../Node/Node";
import { operators } from "../Token/Operator";
import { Token } from "../Token/Token";
import TokenStream from "./TokenStream";


export default function parse(input: string): Node {
  return parseStream(new TokenStream(input))
}

function parseStream(ts: TokenStream): Node {
  const tk = ts.peek()

  if (tk === null) {
    ts.croak('Unexpected end of input')
    throw new Error('Unreachable')
  }

  const node = parseSimpleNode(tk) ?? parseBool(tk)

  if (node === undefined) {
    ts.croak(`Unexpected token: ${tk.t}`)
    throw new Error('Unreachable')
  }

  return node
}

function isPunc(tk: Token | null, ch: string): boolean {
  return tk?.t === 'Punc' && tk.value === ch
}

function skipPunc(ts: TokenStream, ch: string): void {
  if (!isPunc(ts.peek(), ch)) {
    ts.croak(`Expecting punctuation: "${ch}"`)
  }
  ts.next()
}

function isOp(tk: Token | null, op: keyof typeof operators): boolean {
  return tk?.t === 'Op' && tk.value === op
}

function skipOp(ts: TokenStream, op: keyof typeof operators): void {
  if (!isOp(ts.peek(), op)) {
    ts.croak(`Expecting operator: "${op}"`)
  }
  ts.next()
}

function parseUnaryOp(ts: TokenStream): Node | undefined {
  const tk = ts.peek()

  if (isOp(tk, '!')) {
    ts.next()
    return {
      t: 'UnaryOp',
      operator: { t: 'Op', value: '!' },
      operand: parseStream(ts)
    }
  }
}

function 