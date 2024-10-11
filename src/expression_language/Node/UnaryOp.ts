import { OperatorString } from "../Token/Operator"
import { Node } from "./Node"

export interface UnaryOp {
  t: 'UnaryOp'
  op: OperatorString
  right: Node
}