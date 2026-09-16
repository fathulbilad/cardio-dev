/*
 * Exercise contract:
 * 1. Return the largest number in the array.
 * 2. Return undefined for an empty array.
 * 3. Do not mutate the input array.
 */

import { describe, expect, it } from "vitest";
import { findLargestNumber } from "../../../src/exercises/day-01/002-find-largest-number";

// Goal: find the largest number; return undefined when the input array is empty.

describe("findLargestNumber", () => {
  it("returns the largest value from an unsorted list", () => {
    const values = [4, 12, -3, 8];
    const snapshot = [...values];

    expect(findLargestNumber(values)).toBe(12);
    expect(values).toEqual(snapshot);
  });

  it("returns the repeated largest value when it appears more than once", () => {
    expect(findLargestNumber([2, 9, 9, 1])).toBe(9);
  });

  it("returns undefined for an empty array", () => {
    expect(findLargestNumber([])).toBeUndefined();
  });
});

/*
 * Research hint: use this only if you are stuck.
 *
 * Concepts: loops, comparison, arrays
 * Search keywords:
 * - "JavaScript find largest number in array"
 * - "JavaScript compare values in for of loop"
 * - "TypeScript function return undefined"
 */
