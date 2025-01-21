export function map<T, U>(t: T | undefined, f: (t: T) => U): U | undefined {
  return t === undefined ? undefined : f(t)
}

export function mapNull<T, U>(t: T | null, f: (t: T) => U): U | null {
  return t === null ? null : f(t)
}

export function groupBy<T, K extends keyof T>(array: T[], key: K): Record<string, T[]> {
  return array.reduce((result, item) => {
    const groupKey = String(item[key]);
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {} as Record<string, T[]>);
}

export function groupByFunc<T, K extends string | number>(array: T[], keyFunc: (t: T) => K): Record<K, T[]> {
  return array.reduce((result, item) => {
    const groupKey = keyFunc(item);
    if (!result[groupKey]) {
      result[groupKey] = [];
    }
    result[groupKey].push(item);
    return result;
  }, {} as Record<K, T[]>);
}

export function mapValues<K extends string | number | symbol, T, U>(
  obj: Record<K, T>,
  f: (val: T) => U
): Record<K, U> {
  const result: Record<K, U> = {} as Record<K, U>;
  for (const key in obj) {
    result[key] = f(obj[key]);
  }
  return result;
}

export function mapKeys<K extends string | number | symbol, U extends string | number | symbol, T>(
  obj: Record<K, T>,
  f: (key: K) => U
): Record<U, T> {
  const result: Record<U, T> = {} as Record<U, T>;
  for (const key in obj) {
    result[f(key)] = obj[key];
  }
  return result;
}

export function zip<T, U>(a: T[], b: U[]): [T, U][] {
  const n = Math.min(a.length, b.length);

  const result: [T, U][] = [];
  for (let i = 0; i < n; i++) {
    result.push([a[i], b[i]]);
  }

  return result;
}