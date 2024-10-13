import { expect, test } from 'vitest'
import parse from '../parse/parse'
import generate from './generate'

function testRoundTrip(expression: string) {
  const ast = parse(expression)

  const generated = generate(ast)

  expect(parse(generated)).toEqual(ast)
}

test('generate', () => {
  testRoundTrip('1')
  testRoundTrip('user')
  testRoundTrip('true')
  testRoundTrip('"hello, world!"')
  testRoundTrip('1 + 1')
  testRoundTrip('1 + 1 * 2')
  testRoundTrip('(1 + 1) * 2')
})