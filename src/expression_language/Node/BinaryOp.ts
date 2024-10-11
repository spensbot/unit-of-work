import { OperatorString } from "../Token/Operator"
import { Node } from "./Node"

export interface BinaryOp {
  t: 'BinaryOp'
  left: Node
  op: OperatorString
  right: Node
}