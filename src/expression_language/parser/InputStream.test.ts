import { expect, test } from 'vitest'
import InputStream from "./InputStream"

test('InputStream', () => {
  const input = new InputStream('hello')
  expect(input.eof()).toBe(false)
  expect(input.peek()).toBe('h')
  expect(input.next()).toBe('h')
  expect(input.next()).toBe('e')
  expect(input.next()).toBe('l')
  expect(input.next()).toBe('l')
  expect(input.next()).toBe('o')
  expect(input.eof()).toBe(true)
})