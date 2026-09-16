/*
 * Exercise contract:
 * 1. Return a new array containing only the even numbers.
 * 2. Keep the original order and preserve duplicates.
 * 3. Add one learner-written test proving the input array is unchanged.
 * 4. Do not mutate the input array.
 */

import { describe, expect, it } from "vitest";
import { keepEvenNumbers } from "../../../src/exercises/day-01/005-keep-even-numbers";

// Goal: create a new array containing only even numbers, preserving order and duplicates.

describe("keepEvenNumbers", () => {
  it("returns only even numbers in the original order", () => {
    const values = [7, 2, 4, 9, 6, 2];
    const snapshot = [...values];

    const result = keepEvenNumbers(values);

    expect(result).toEqual([2, 4, 6, 2]);
    expect(result).not.toBe(values);
    expect(values).toEqual(snapshot);
  });

  it("returns an empty array when there are no even numbers", () => {
    const values = [1, 3, 5];

    expect(keepEvenNumbers(values)).toEqual([]);
    expect(values).toEqual([1, 3, 5]);
  });

  it("keeps duplicate even values", () => {
    expect(keepEvenNumbers([8, 8, 10])).toEqual([8, 8, 10]);
  });
});

/*
 * Research hint: use this only if you are stuck.
 *
 * Concepts: conditions, building arrays, immutability
 * Search keywords:
 * - "JavaScript filter even numbers from array"
 * - "JavaScript remainder operator percent"
 * - "JavaScript Array.filter immutable"
 */
