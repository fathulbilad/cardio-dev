/*
 * Exercise contract:
 * 1. Return the sum of every number in the array.
 * 2. Return 0 for an empty array.
 * 3. Do not mutate the input array.
 */

import { describe, expect, it } from "vitest";
import { sumAllNumbers } from "../../../src/exercises/day-01/001-sum-all-numbers";

// Goal: add every number together, including negative values, without changing the input array.

describe("sumAllNumbers", () => {
  it("adds every number in the array", () => {
    const values = [5, -2, 9, 0];
    const snapshot = [...values];

    expect(sumAllNumbers(values)).toBe(12);
    expect(values).toEqual(snapshot);
  });

  it("returns 0 for an empty array", () => {
    expect(sumAllNumbers([])).toBe(0);
  });

  it("handles a single value", () => {
    const values = [7];

    expect(sumAllNumbers(values)).toBe(7);
    expect(values).toEqual([7]);
  });
});

/*
 * Research hint: use this only if you are stuck.
 *
 * Concepts: array accumulation, loops, immutable input
 * Search keywords:
 * - "JavaScript sum all numbers in array"
 * - "JavaScript Array.reduce accumulator"
 * - "TypeScript readonly array"
 */
