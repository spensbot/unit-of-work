import TokenStream from "../parser/TokenStream";
import { Id } from "../Token/Id";
import { Str } from "../Token/Str";
import { Num } from "../Token/Token";
import { BinaryOp } from "./BinaryOp";
import { Bool } from "./Bool";
import { UnaryOp } from "./UnaryOp";

export type Node = Num | Str | Id | Bool | BinaryOp | UnaryOp // Punc

export function parseSimpleNode(ts: TokenStream): Num | Str | Id | undefined {
  const tk = ts.peek()

  if (tk?.t === 'Num' || tk?.t === 'Str' || tk?.t === 'Id') {
    ts.next()
    return tk as Num | Str | Id
  }
}