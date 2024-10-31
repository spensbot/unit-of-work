import * as f from './functional'
import { expect, test } from 'vitest'

test('map', () => {
  expect(f.map(1, x => x + 1)).toEqual(2)
  expect(f.map<number, number>(undefined, x => x + 1)).toEqual(undefined)
})

test('groupBy', () => {
  const group = f.groupBy([{ a: '1' }, { a: '2' }, { a: '1' }], 'a')
  expect(group).toEqual({ '1': [{ a: '1' }, { a: '1' }], '2': [{ a: '2' }] })
})

test('groupByFunc', () => {
  const group = f.groupByFunc([{ a: '1' }, { a: '2' }, { a: '1' }], x => x.a)
  expect(group).toEqual({ '1': [{ a: '1' }, { a: '1' }], '2': [{ a: '2' }] })
})

test('groupByFunc number', () => {
  const group = f.groupByFunc([{ a: 1 }, { a: 2 }, { a: 1 }], x => x.a)
  expect(group).toEqual({ 1: [{ a: 1 }, { a: 1 }], 2: [{ a: 2 }] })
})