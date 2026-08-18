export function findFirstIndex(values: string[], target: string): number {
  const found = values.findIndex((item) => item === target) ?? -1

  return found

  // i think we can improve bit with looping or maybe indexOf

  throw new Error("Not implemented");
}
