/*
 * Exercise contract:
 * 1. Return the longest word in the array.
 * 2. If two words tie for length, return the first one.
 * 3. Add one learner-written test for a tied-length case.
 * 4. Do not mutate the input array.
 */

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

/*
 * Research hint: use this only if you are stuck.
 *
 * Concepts: comparison, strings, ties
 * Search keywords:
 * - "JavaScript find longest string in array"
 * - "JavaScript reduce keep first value on tie"
 * - "JavaScript string length comparison"
 */
