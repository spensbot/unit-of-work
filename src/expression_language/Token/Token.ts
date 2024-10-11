import { Operator } from './Operator'
import { Id } from './Id'
import { Keyword } from './Keyword'
import { Punc } from './Punc'
import { Str } from './Str'

export interface Num {
  t: 'Num'
  val: number
}

export type Token = Punc | Num | Str | Keyword | Id | Operator
