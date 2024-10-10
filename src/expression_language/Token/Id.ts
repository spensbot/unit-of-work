export interface Id {
  t: 'Id'
  value: string
}

export function isIdStart(ch: string): boolean {
  return /[a-z_]/i.test(ch)
}

export function isId(ch: string): boolean {
  return isIdStart(ch) || '?!-<>=0123456789'.includes(ch)
}
