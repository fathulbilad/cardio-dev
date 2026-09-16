/*
 * Exercise contract:
 * 1. Return a new array with consecutive equal values collapsed to one copy.
 * 2. Keep separated duplicate runs as separate entries.
 * 3. Add one learner-written test for a repeated-run case.
 * 4. Do not mutate the input array.
 */

import { describe, expect, it } from "vitest";
import { collapseAdjacentDuplicates } from "../../../src/exercises/day-01/010-collapse-adjacent-duplicates";

// Goal: remove repeated neighboring values while keeping duplicates separated by another value.

describe("collapseAdjacentDuplicates", () => {
  it("collapses repeated runs down to one value each", () => {
    const values = [1, 1, 2, 2, 2, 3, 1, 1];
    const snapshot = [...values];

    const result = collapseAdjacentDuplicates(values);

    expect(result).toEqual([1, 2, 3, 1]);
    expect(result).not.toBe(values);
    expect(values).toEqual(snapshot);
  });

  it("leaves separated duplicates in separate runs", () => {
    expect(collapseAdjacentDuplicates([4, 4, 1, 4, 4])).toEqual([4, 1, 4]);
  });

  it("returns an empty array for empty input", () => {
    expect(collapseAdjacentDuplicates([])).toEqual([]);
  });
});

/*
 * Research hint: use this only if you are stuck.
 *
 * Concepts: indexing, conditions, run compression
 * Search keywords:
 * - "JavaScript remove adjacent duplicate array values"
 * - "JavaScript compare current item with previous index"
 * - "run length encoding consecutive duplicates"
 */
