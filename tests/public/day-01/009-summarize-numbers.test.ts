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
