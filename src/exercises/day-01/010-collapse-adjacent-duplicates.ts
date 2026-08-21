export function collapseAdjacentDuplicates(values: number[]): number[] {
  const data = values.filter((item, index, array) => item !== array[index + 1]) || []

  return data

  throw new Error("Not implemented");
}
