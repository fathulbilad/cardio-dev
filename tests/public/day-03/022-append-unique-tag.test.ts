/*
 * Exercise contract:
 * 1. Append the tag only when it is missing.
 * 2. Return the original profile reference when nothing changes.
 * 3. Leave the input object and tags array unchanged.
 * 4. Add at least one learner-authored test for the no-op case.
 * 5. Do not mutate the profile or its tags array.
 * 6. Keep existing tags in their original order.
 */

import { describe, expect, it } from "vitest";
import { appendUniqueTag } from "../../../src/exercises/day-03/022-append-unique-tag";

describe("appendUniqueTag", () => {
  it("adds a missing tag immutably and returns the original profile when the tag already exists", () => {
    const profile = { name: "Ada", tags: ["typescript"] };

    const added = appendUniqueTag(profile, "vitest");
    expect(added).toEqual({ name: "Ada", tags: ["typescript", "vitest"] });
    expect(added).not.toBe(profile);
    expect(added.tags).not.toBe(profile.tags);
    expect(profile).toEqual({ name: "Ada", tags: ["typescript"] });

    const unchanged = appendUniqueTag(profile, "typescript");
    expect(unchanged).toBe(profile);
    expect(unchanged.tags).toBe(profile.tags);
  });
});

/*
 * Research hint: use this only if you are stuck.
 *
 * Concepts: references, immutability, objects, arrays
 * Search keywords:
 * - "JavaScript immutable object update nested array"
 * - "JavaScript referential equality return same object no change"
 * - "JavaScript Array.includes append unique value"
 */
