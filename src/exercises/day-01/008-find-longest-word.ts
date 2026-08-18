export function findLongestWord(words: string[]): string | undefined {
  if (!words || words.length === 0) return undefined

  let longWord : string = ''

  const data = words.reduce((value, acc): string => {
    if (acc.length > value.length) return acc

    if (value.length > longWord.length) return value

    return longWord
  })

  return data

  // this is the way to do it because right now you have two accumulator
  //   const data = words.reduce((longest, word): string => {
  // if (word.length > longest.length) return word
  // return longest
  // })

  return data

  // throw new Error("Not implemented");
}
