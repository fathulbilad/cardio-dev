export function collectUniqueLabels(labels: readonly string[]): Set<string> {
  const filter : string[] = []
  for (let i of labels) {
    const trimData = i.trim()
    if (i.length > 0) {
      filter.push(trimData)
    }
  }

  const data = new Set(filter)

  return data
  throw new Error("Not implemented");
}
