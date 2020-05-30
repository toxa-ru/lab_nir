export function filterEmpty<T>(a: T[]): T[] {
  return a.filter(Boolean);
}