export function collapseAdjacentDuplicates(values: number[]): number[] {
  if (values.length === 0) return []

  const data = values.reduce((prevItem, nextItem) => {
    if (prevItem !== nextItem) return prevItem

    return nextItem
  }, 0)

  console.log({data})


  throw new Error("Not implemented");
}
