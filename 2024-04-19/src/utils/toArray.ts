export function toArray<T>(data: Map<string, T>): T[] {
  return Array.from(data.values())
}
