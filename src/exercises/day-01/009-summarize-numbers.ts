export type NumberSummary = {
  count: number;
  sum: number;
  min: number | undefined;
  max: number | undefined;
};

export function summarizeNumbers(values: number[]): NumberSummary {
  let numberData: NumberSummary = {
    count: 0,
    sum: 0,
    min: undefined,
    max: undefined
  }

  if (values.length === 0) numberData

  numberData.count = values.length

  for (let i of values) {
    numberData.sum += i
    numberData.min = numberData.min === undefined ? i : i < numberData.min ? i : numberData.min
    numberData.max = numberData.max === undefined ? i : i > numberData.max ? i : numberData.max
  }

  return numberData
  // const data = values.reduce((prevValue, currValue, idx, array): any => {
  //   numberData.count = array.length
  //   numberData.sum = numberData.sum + array[idx]
  //  return numberData
  // })

  throw new Error("Not implemented");
}
