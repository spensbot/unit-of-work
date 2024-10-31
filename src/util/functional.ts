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