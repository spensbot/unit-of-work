export interface Keyword {
  t: 'Kw'
  value: string
}

const keywords = ['true', 'false']

export function isKeyword(value: string): boolean {
  return keywords.includes(value)
}
