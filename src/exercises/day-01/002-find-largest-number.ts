export function findLargestNumber(values: number[]): number | undefined {
  if (values.length === 0) return undefined

 const max = Math.max(...values)
  return max

  throw new Error("Not implemented");
}
