import { Operator } from "../Token/Operator"
import { Node } from "./Node"

export interface BinaryOp {
  t: 'BinaryOp'
  operator: Operator
  left: Node
  right: Node
}