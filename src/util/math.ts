// Returns a value between a and b
export function lerp(a: number, b: number, ratio: number) {
  return a + (b - a) * ratio
}

// Returns a ratio
export function unlerp(a: number, b: number, val: number) {
  return (val - a) / (b - a)
}

export function flip(min: number, max: number, val: number) {
  return max - val + min
}
