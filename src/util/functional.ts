export function map<T, U>(t: T | undefined, f: (t: T) => U): U | undefined {
  return t === undefined ? undefined : f(t)
}

export function mapNull<T, U>(t: T | null, f: (t: T) => U): U | null {
  return t === null ? null : f(t)
}