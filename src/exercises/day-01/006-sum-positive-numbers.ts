export function sumPositiveNumbers(values: number[]): number {
  // the sum is from 0 so it do something like this item + sum fill the 0
  const numberPosti = values.filter((item) => item > 0)
    .reduce((item, sum) => item + sum, 0)
  return numberPosti

  // throw new Error("Not implemented");
}
