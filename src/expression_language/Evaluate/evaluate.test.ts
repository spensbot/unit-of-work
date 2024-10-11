import { expect, test } from 'vitest'
import evaluate from "./evaluate"
import parse from '../parser/parse'

test('evaluate', () => {
  expect(evaluate({ t: 'Num', val: 1 }, {})).toBe(1)
  expect(evaluate({ t: 'Str', val: 'hello' }, {})).toBe('hello')
  expect(evaluate({ t: 'Bool', val: true }, {})).toBe(true)
  expect(evaluate({ t: 'Id', val: 'a' }, { a: 1 })).toBe(1)
  expect(evaluate(parse('1 + 1 + 2'), {})).toBe(4)
  expect(evaluate(parse('1 + 1 * 2'), {})).toBe(3)
  expect(evaluate(parse('(1 + 1) * 2'), {})).toBe(4)
  expect(evaluate(parse('!true'), {})).toBe(false)

  const unitContext = {
    assignee: {
      name: 'John',
      age: 30,
      pet: {
        name: 'Fluffy'
      }
    }
  }

  expect(evaluate(parse('assignee.name == "John" && assignee.age > 20'), unitContext)).toBe(true)
  expect(evaluate(parse('!(assignee.name == "John") && assignee.age < 20'), unitContext)).toBe(false)
  expect(evaluate(parse('assignee.pet.name'), unitContext)).toBe('Fluffy')
})