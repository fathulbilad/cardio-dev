/*
 * Exercise contract:
 * 1. Return each value increased by the provided offset.
 * 2. Preserve the original order.
 * 3. Leave the input array unchanged.
 * 4. Do not mutate the input array.
 * 5. Handle empty arrays without special setup.
 */

import { describe, expect, it } from "vitest";
import { offsetNumbers } from "../../../src/exercises/day-03/021-offset-numbers";

describe("offsetNumbers", () => {
  it("returns a new array with each number shifted by the offset without changing the input", () => {
    const values = [2, -1, 5];
    const original = [...values];

    expect(offsetNumbers(values, 3)).toEqual([5, 2, 8]);
    expect(offsetNumbers([], 4)).toEqual([]);
    expect(values).toEqual(original);
  });
});

/*
 * Research hint: use this only if you are stuck.
 *
 * Concepts: functions, scope, arrays, mapping
 * Search keywords:
 * - "JavaScript Array.map add value"
 * - "JavaScript immutable array transformation"
 * - "TypeScript readonly array map"
 */
