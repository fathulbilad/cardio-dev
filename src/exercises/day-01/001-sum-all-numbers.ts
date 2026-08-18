export function sumAllNumbers(values: number[]): number {
  let initialValue = 0
  const sum = values.reduce((accumulator, currentValue)=> accumulator + currentValue, initialValue )

  return sum
  throw new Error("Not implemented");
}
