/*
 * Exercise contract:
 * 1. Ignore inactive users.
 * 2. Match names case-insensitively after trimming the query.
 * 3. Return the original user objects in their original order.
 * 4. Add at least one learner-authored test for the empty-query case.
 * 5. Do not mutate the input array or user objects.
 * 6. An empty or whitespace-only query matches all active users.
 */

import { describe, expect, it } from "vitest";
import { filterActiveUsers } from "../../../src/exercises/day-03/024-filter-active-users";

describe("filterActiveUsers", () => {
  it("returns only active users whose names match the query, ignoring case and whitespace", () => {
    const users = [
      { id: "1", name: "Maya", active: true },
      { id: "2", name: "Noah", active: false },
      { id: "3", name: "ANNA", active: true },
      { id: "4", name: "Zoe", active: true },
    ];

    const matches = filterActiveUsers(users, "an");
    expect(matches).toEqual([users[2]]);
    expect(matches[0]).toBe(users[2]);

    expect(filterActiveUsers(users, "   ")).toEqual([users[0], users[2], users[3]]);
  });
});

/*
 * Research hint: use this only if you are stuck.
 *
 * Concepts: pure transformations, filtering, case handling, references
 * Search keywords:
 * - "JavaScript case insensitive includes trim query"
 * - "JavaScript filter objects multiple conditions"
 * - "JavaScript preserve object references Array.filter"
 */
