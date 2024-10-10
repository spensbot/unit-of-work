export interface Punc {
  t: 'Punc'
  value: string
}

const punc = '()'

export function isPunc(ch: string): boolean {
  return punc.includes(ch)
}
