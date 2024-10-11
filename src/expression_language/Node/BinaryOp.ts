import { OperatorString } from "../Token/Operator"
import { Node } from "./Node"

export interface BinaryOp {
  t: 'BinaryOp'
  op: OperatorString
  left: Node
  right: Node
}