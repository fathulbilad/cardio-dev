export function countGreaterThan(values: number[], minimum: number): number {
  let count : number = 0
  for (let i of values) {
    if (i > minimum) {
      count++
    }
  }
  return count
  // I can use reduce for this one but i feel the intend will be different

  throw new Error("Not implemented");
}
