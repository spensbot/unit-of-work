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

export type OperatorString = keyof typeof operators

// Higher number means higher precedence
export const operatorPrecedence = {
  '!': 100,
  '.': 90,
  '*': 80,
  '/': 80,
  // '%': 80,
  '+': 70,
  '-': 70,
  '>': 60,
  '<': 60,
  '>=': 60,
  '<=': 60,
  '==': 50,
  '!=': 50,
  '&&': 40,
  '||': 30,
  // '=': 8
}

const operatorChars = Object.keys(operators).join('')

export function isOpChar(ch: string): boolean {
  return operatorChars.includes(ch)
}

export interface Operator {
  t: 'Op'
  val: OperatorString
}
