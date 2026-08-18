export function averageNumbers(values: number[]): number | null {
  if (!values || values.length < 1) return null

  const avgNum = values.reduce((item, sum, index, array): number => {
    sum += item

    if (index === array.length - 1) {
      return sum / array.length
    }
    return sum
  }, 0);

  return avgNum

  // throw new Error("Not implemented");
}
