/*
 * Exercise contract:
 * 1. Return count, sum, min, and max in one object.
 * 2. Use undefined for min and max when the array is empty.
 * 3. Add one learner-written test for the empty-array summary.
 * 4. Do not mutate the input array.
 */

import { describe, expect, it } from "vitest";
import { summarizeNumbers } from "../../../src/exercises/day-01/009-summarize-numbers";

// Goal: return one summary object containing count, sum, minimum, and maximum values.

describe("summarizeNumbers", () => {
  it("returns count, sum, min, and max for mixed values", () => {
    const values = [4, -2, 10, 1];
    const snapshot = [...values];

    expect(summarizeNumbers(values)).toEqual({
      count: 4,
      sum: 13,
      min: -2,
      max: 10,
    });
    expect(values).toEqual(snapshot);
  });

  it("returns empty summary values for an empty array", () => {
    expect(summarizeNumbers([])).toEqual({
      count: 0,
      sum: 0,
      min: undefined,
      max: undefined,
    });
  });

  it("handles a single value", () => {
    expect(summarizeNumbers([8])).toEqual({
      count: 1,
      sum: 8,
      min: 8,
      max: 8,
    });
  });
});

/*
 * Research hint: use this only if you are stuck.
 *
 * Concepts: accumulation, comparison, object output
 * Search keywords:
 * - "JavaScript calculate count sum min max array"
 * - "JavaScript single pass array accumulator object"
 * - "TypeScript optional undefined object values"
 */
