import { expect, test } from 'vitest'
import parse from '../parse/parse'
import generate from './generate'

function testRoundTrip(expression: string) {
  const ast = parse(expression)

  console.log(`AST: ${JSON.stringify(ast, null, 2)}`)

  const generated = generate(ast)

  console.log(`GENERATED: ${generated}`)

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