export function eqDeepSimple<T>(a: T, b: T) {
  return JSON.stringify(a) === JSON.stringify(b)
}