export function indexArray(n: number) {
  return new Array(n).fill(0).map((_, i) => i)
}

export function all<T>(ts: T[], predicate: (t: T) => boolean): boolean {
  return ts.reduce((acc, t) => acc && predicate(t), true)
}