import { describe, expect, it } from "vitest";
import { averageNumbers } from "../../../src/exercises/day-01/007-average-numbers";

// Goal: calculate the arithmetic mean, returning null when there are no values.

describe("averageNumbers", () => {
  it("returns the arithmetic mean for several values", () => {
    const values = [2, 4, 7];
    const snapshot = [...values];

    expect(averageNumbers(values)).toBeCloseTo(13 / 3, 10);
    expect(values).toEqual(snapshot);
  });

  it("returns null for an empty array", () => {
    expect(averageNumbers([])).toBeNull();
  });

  it("handles negative values as part of the average", () => {
    expect(averageNumbers([10, -2, 4])).toBeCloseTo(4, 10);
  });
});
