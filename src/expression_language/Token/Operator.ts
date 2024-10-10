export const operators = {
  '!': (a: boolean) => !a,
  '.': (a: any, b: any) => a[b],
  '+': (a: number, b: number) => a + b,
  '-': (a: number, b: number) => a - b,
  '*': (a: number, b: number) => a * b,
  '/': (a: number, b: number) => a / b,
  '&&': (a: boolean, b: boolean) => a && b,
  '||': (a: boolean, b: boolean) => a || b,
  '==': (a: any, b: any) => a === b,
  '!=': (a: any, b: any) => a !== b,
  '>': (a: number, b: number) => a > b,
  '<': (a: number, b: number) => a < b,
  '>=': (a: number, b: number) => a >= b,
  '<=': (a: number, b: number) => a <= b,
}

export type OperatorVal = keyof typeof operators

export const operatorPrecedence = {
  '!': 1,
  '.': 1,
  '*': 2,
  '/': 2,
  // '%': 2,
  '+': 3,
  '-': 3,
  '>': 4,
  '<': 4,
  '>=': 4,
  '<=': 4,
  '==': 5,
  '!=': 5,
  '&&': 6,
  '||': 7,
  // '=': 8
}

const operatorChars = Object.keys(operators).join('')

export function isOpChar(ch: string): boolean {
  return operatorChars.includes(ch)
}

export interface Operator {
  t: 'Op'
  value: OperatorVal
}
