import { describe, expect, it } from "vitest";
import { findLongestWord } from "../../../src/exercises/day-01/008-find-longest-word";

// Goal: return the longest word; keep the first word when there is a tie, or undefined when empty.

describe("findLongestWord", () => {
  it("returns the longest word", () => {
    const words = ["sun", "planet", "moon"];
    const snapshot = [...words];

    expect(findLongestWord(words)).toBe("planet");
    expect(words).toEqual(snapshot);
  });

  it("returns the first word when two words have the same length", () => {
    expect(findLongestWord(["pear", "plum", "kiwi"])).toBe("pear");
  });

  it("returns undefined for an empty list", () => {
    expect(findLongestWord([])).toBeUndefined();
  });
});
