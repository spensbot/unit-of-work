export interface Punc {
  t: 'Punc'
  val: string
}

const punc = '()'

export function isPunc(ch: string): boolean {
  return punc.includes(ch)
}
