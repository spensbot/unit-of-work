import { Operator } from "../Token/Operator"
import { Node } from "./Node"

export interface UnaryOp {
  t: 'UnaryOp'
  operator: Operator
  operand: Node
}