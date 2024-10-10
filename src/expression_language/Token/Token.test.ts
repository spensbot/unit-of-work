import { expect, test } from 'vitest'
import { isPunc } from './Punc'
import { isIdStart, isId } from './Id'
import { isKeyword } from './Keyword'
import { isOpChar } from './Operator'

test('isPunc', () => {
  expect(isPunc('(')).toBe(true)
  expect(isPunc(')')).toBe(true)
  expect(isPunc('a')).toBe(false)
})

test('isKeyword', () => {
  expect(isKeyword('true')).toBe(true)
  expect(isKeyword('false')).toBe(true)
  expect(isKeyword('hello')).toBe(false)
})

test('isIdStart', () => {
  expect(isIdStart('a')).toBe(true)
  expect(isIdStart('A')).toBe(true)
  expect(isIdStart('_')).toBe(true)
  expect(isIdStart('1')).toBe(false)
})

test('isId', () => {
  expect(isId('a')).toBe(true)
  expect(isId('A')).toBe(true)
  expect(isId('_')).toBe(true)
  expect(isId('1')).toBe(true)
  expect(isId('!')).toBe(true)
  expect(isId('?')).toBe(true)
  expect(isId('-')).toBe(true)
  expect(isId('<')).toBe(true)
  expect(isId('>')).toBe(true)
  expect(isId('=')).toBe(true)
  expect(isId('hello')).toBe(true)

  expect(isId(' ')).toBe(false)
  expect(isId('.')).toBe(false)
})


test('isOpChar', () => {
  expect(isOpChar('+')).toBe(true)
  expect(isOpChar('-')).toBe(true)
  expect(isOpChar('*')).toBe(true)
  expect(isOpChar('/')).toBe(true)
})
