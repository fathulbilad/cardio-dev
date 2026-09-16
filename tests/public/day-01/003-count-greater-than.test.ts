/*
 * Exercise contract:
 * 1. Count only numbers that are strictly greater than the threshold.
 * 2. Return 0 for an empty array.
 * 3. Do not mutate the input array.
 */

import { describe, expect, it } from "vitest";
import { countGreaterThan } from "../../../src/exercises/day-01/003-count-greater-than";

// Goal: count values strictly greater than the given threshold. Equal values do not count.

describe("countGreaterThan", () => {
  it("counts only values that are strictly greater than the minimum", () => {
    const values = [1, 3, 4, 3, 9];
    const snapshot = [...values];

    expect(countGreaterThan(values, 3)).toBe(2);
    expect(values).toEqual(snapshot);
  });

  it("returns 0 when nothing is above the threshold", () => {
    expect(countGreaterThan([2, 2, 1], 5)).toBe(0);
  });

  it("does not count values equal to the threshold", () => {
    expect(countGreaterThan([5, 6, 5, 7], 5)).toBe(2);
  });
});

/*
 * Research hint: use this only if you are stuck.
 *
 * Concepts: loops, conditions, counting
 * Search keywords:
 * - "JavaScript count array items matching condition"
 * - "JavaScript Array.filter length"
 * - "JavaScript for of conditional counter"
 */
