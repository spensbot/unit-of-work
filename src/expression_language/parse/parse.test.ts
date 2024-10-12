import { expect, test } from 'vitest'
import parse from './parse'
import { Node } from '../Node/Node'

function testParse(expr: string, expected: Node) {
  const node = parse(expr)

  // console.log(util.inspect(node, false, null, true))

  expect(node).toEqual(expected)
}

test('parse simple', () => {
  testParse('1', { t: 'Num', val: 1 })
  testParse('"hello"', { t: 'Str', val: 'hello' })
  testParse('true', { t: 'Bool', val: true })
  testParse('user', { t: 'Id', val: 'user' })
  testParse('!true', { t: 'UnaryOp', op: '!', operand: { t: 'Bool', val: true } })
  testParse('(user)', { t: 'Id', val: 'user' })
  testParse('1 + 1', { t: 'BinaryOp', op: '+', left: { t: 'Num', val: 1 }, right: { t: 'Num', val: 1 } })
  testParse('1 + 1 * 2', {
    t: 'BinaryOp',
    op: '+',
    left: { t: 'Num', val: 1 },
    right: {
      t: 'BinaryOp',
      op: '*',
      left: { t: 'Num', val: 1 },
      right: { t: 'Num', val: 2 }
    }
  })
  testParse('(1 + 1) * 2', {
    t: 'BinaryOp',
    op: '*',
    left: { t: 'BinaryOp', op: '+', left: { t: 'Num', val: 1 }, right: { t: 'Num', val: 1 } },
    right: { t: 'Num', val: 2 }
  })
})

test('parse', () => {
  testParse('!(user.name == "spenser") && user.age > 21', {
    t: 'BinaryOp',
    op: '&&',
    left: {
      t: 'UnaryOp',
      op: '!',
      operand: {
        t: 'BinaryOp',
        op: '==',
        left: {
          t: 'BinaryOp',
          op: '.',
          left: { t: 'Id', val: 'user' },
          right: { t: 'Id', val: 'name' }
        },
        right: { t: 'Str', val: 'spenser' }
      }
    },
    right: {
      t: 'BinaryOp',
      op: '>',
      left: {
        t: 'BinaryOp',
        op: '.',
        left: { t: 'Id', val: 'user' },
        right: { t: 'Id', val: 'age' }
      },
      right: { t: 'Num', val: 21 }
    }
  })
})