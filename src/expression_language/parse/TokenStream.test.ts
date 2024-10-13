import { expect, test } from 'vitest'
import TokenStream from "./TokenStream"


test('TokenStream', () => {
  const stream = new TokenStream('hello== true || goodbye == false && !((1 + 5) != 6) && user.name == "spenser"')

  expect(stream.next()).toEqual({ t: 'Id', val: 'hello' })
  expect(stream.next()).toEqual({ t: 'Op', val: '==' })
  expect(stream.next()).toEqual({ t: 'Kw', val: 'true' })
  expect(stream.next()).toEqual({ t: 'Op', val: '||' })
  expect(stream.next()).toEqual({ t: 'Id', val: 'goodbye' })
  expect(stream.next()).toEqual({ t: 'Op', val: '==' })
  expect(stream.next()).toEqual({ t: 'Kw', val: 'false' })
  expect(stream.next()).toEqual({ t: 'Op', val: '&&' })
  expect(stream.next()).toEqual({ t: 'Op', val: '!' })
  expect(stream.next()).toEqual({ t: 'Punc', val: '(' })
  expect(stream.next()).toEqual({ t: 'Punc', val: '(' })
  expect(stream.next()).toEqual({ t: 'Num', val: 1 })
  expect(stream.next()).toEqual({ t: 'Op', val: '+' })
  expect(stream.next()).toEqual({ t: 'Num', val: 5 })
  expect(stream.next()).toEqual({ t: 'Punc', val: ')' })
  expect(stream.next()).toEqual({ t: 'Op', val: '!=' })
  expect(stream.next()).toEqual({ t: 'Num', val: 6 })
  expect(stream.next()).toEqual({ t: 'Punc', val: ')' })
  expect(stream.next()).toEqual({ t: 'Op', val: '&&' })
  expect(stream.next()).toEqual({ t: 'Id', val: 'user' })
  expect(stream.next()).toEqual({ t: 'Op', val: '.' })
  expect(stream.next()).toEqual({ t: 'Id', val: 'name' })
  expect(stream.next()).toEqual({ t: 'Op', val: '==' })
  expect(stream.next()).toEqual({ t: 'Str', val: 'spenser' })
  expect(stream.next()).toEqual(null)
})