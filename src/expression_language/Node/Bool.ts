import { Token } from "../Token/Token"

export interface Bool {
  t: 'Bool'
  value: boolean
}

export function parseBool(token: Token): Bool | undefined {
  if (token.t === 'Kw' && (token.value === 'true' || token.value === 'false')) {
    return {
      t: 'Bool',
      value: token.value === 'true'
    }
  }
}