import { describe, expect, it } from "vitest";
import { sumPositiveNumbers } from "../../../src/exercises/day-01/006-sum-positive-numbers";

// Goal: add only numbers greater than zero; ignore zero and negative values.

describe("sumPositiveNumbers", () => {
  it("adds only numbers greater than zero", () => {
    const values = [-3, 0, 4, 5, -1];
    const snapshot = [...values];

    expect(sumPositiveNumbers(values)).toBe(9);
    expect(values).toEqual(snapshot);
  });

  it("returns 0 when every number is non-positive", () => {
    expect(sumPositiveNumbers([-2, 0, -5])).toBe(0);
  });

  it("counts a single positive number by itself", () => {
    expect(sumPositiveNumbers([11])).toBe(11);
  });
});
