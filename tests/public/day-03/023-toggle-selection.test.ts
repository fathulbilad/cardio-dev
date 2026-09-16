/*
 * Exercise contract:
 * 1. Add the id when it is missing.
 * 2. Remove the id when it is already present.
 * 3. Preserve the order of the other ids.
 * 4. Add at least one learner-authored test for the remove case.
 * 5. Do not mutate the input array.
 * 6. Keep the output free of duplicate ids.
 */

import { describe, expect, it } from "vitest";
import { toggleSelection } from "../../../src/exercises/day-03/023-toggle-selection";

describe("toggleSelection", () => {
  it("adds or removes an id without mutating the original selection", () => {
    const selectedIds = ["alpha", "gamma"];
    const original = [...selectedIds];

    expect(toggleSelection(selectedIds, "beta")).toEqual(["alpha", "gamma", "beta"]);
    expect(toggleSelection(selectedIds, "alpha")).toEqual(["gamma"]);
    expect(selectedIds).toEqual(original);
  });
});

/*
 * Research hint: use this only if you are stuck.
 *
 * Concepts: mutation, immutability, arrays, filtering
 * Search keywords:
 * - "JavaScript toggle item in array immutable"
 * - "JavaScript Array.includes filter add remove"
 * - "React set like array selection pattern"
 */
