export function keepEvenNumbers(values: number[]): number[] {
  // let even = []
  // for (let i of values) {
  //   if (i % 2 === 0) even.push(i)
  // }

  // return even

  const even = values.filter((item) => item % 2 === 0)
  return even

  throw new Error("Not implemented");
}
