import { describe, expect, it } from "vitest";
import { findFirstIndex } from "../../../src/exercises/day-01/004-find-first-index";

// Goal: return the position of the first exact match, or -1 when no value matches.

describe("findFirstIndex", () => {
  it("returns the index of the first matching value", () => {
    const values = ["blue", "green", "blue", "red"];
    const snapshot = [...values];

    expect(findFirstIndex(values, "blue")).toBe(0);
    expect(values).toEqual(snapshot);
  });

  it("returns -1 when the target is missing", () => {
    expect(findFirstIndex(["a", "b", "c"], "z")).toBe(-1);
  });

  it("matches text exactly, including case", () => {
    expect(findFirstIndex(["Ada", "ada"], "ada")).toBe(1);
    expect(findFirstIndex(["Ada", "ada"], "ADA")).toBe(-1);
  });
});
