import { expect, test } from 'vitest'
import TokenStream from "./TokenStream"


test('TokenStream', () => {
  const stream = new TokenStream('hello == true || goodbye == false && !((1 + 5) != 6) && user.name == "spenser"')

  // while (!stream.eof()) {
  //   console.log(stream.next())
  // }

  expect(stream.next()).toEqual({ t: 'Id', value: 'hello' })
  expect(stream.next()).toEqual({ t: 'Op', value: '==' })
  expect(stream.next()).toEqual({ t: 'Kw', value: 'true' })
  expect(stream.next()).toEqual({ t: 'Op', value: '||' })
  expect(stream.next()).toEqual({ t: 'Id', value: 'goodbye' })
  expect(stream.next()).toEqual({ t: 'Op', value: '==' })
  expect(stream.next()).toEqual({ t: 'Kw', value: 'false' })
  expect(stream.next()).toEqual({ t: 'Op', value: '&&' })
  expect(stream.next()).toEqual({ t: 'Op', value: '!' })
  expect(stream.next()).toEqual({ t: 'Punc', value: '(' })
  expect(stream.next()).toEqual({ t: 'Punc', value: '(' })
  expect(stream.next()).toEqual({ t: 'Num', value: 1 })
  expect(stream.next()).toEqual({ t: 'Op', value: '+' })
  expect(stream.next()).toEqual({ t: 'Num', value: 5 })
  expect(stream.next()).toEqual({ t: 'Punc', value: ')' })
  expect(stream.next()).toEqual({ t: 'Op', value: '!=' })
  expect(stream.next()).toEqual({ t: 'Num', value: 6 })
  expect(stream.next()).toEqual({ t: 'Punc', value: ')' })
  expect(stream.next()).toEqual({ t: 'Op', value: '&&' })
  expect(stream.next()).toEqual({ t: 'Id', value: 'user' })
  expect(stream.next()).toEqual({ t: 'Op', value: '.' })
  expect(stream.next()).toEqual({ t: 'Id', value: 'name' })
  expect(stream.next()).toEqual({ t: 'Op', value: '==' })
  expect(stream.next()).toEqual({ t: 'Str', value: 'spenser' })
})