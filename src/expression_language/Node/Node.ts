import { Id } from "../Token/Id";
import { Str } from "../Token/Str";
import { Num, Token } from "../Token/Token";
import { BinaryOp } from "./BinaryOp";
import { UnaryOp } from "./UnaryOp";
import { Bool } from "./Bool";

export type Node = Num | Str | Id | Bool | BinaryOp | UnaryOp // Punc

export function parseSimpleNode(tk: Token): Num | Str | Id | undefined {
  if (tk.t === 'Num' || tk.t === 'Str' || tk.t === 'Id') {
    return tk
  }
}