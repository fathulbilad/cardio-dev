/*
 * Exercise contract:
 * 1. Keep one task per id, choosing the newest updatedAt value.
 * 2. If updatedAt ties, keep the later task from the input.
 * 3. Sort by priority descending, then title ascending, then id ascending.
 * 4. Add at least one learner-authored test for the duplicate-and-tie case.
 * 5. Do not mutate the input array or task objects.
 * 6. Return the original task object for each kept task.
 */

import { describe, expect, it } from "vitest";
import { dedupeAndRankTasks } from "../../../src/exercises/day-03/025-dedupe-and-rank-tasks";

describe("dedupeAndRankTasks", () => {
  it("keeps the newest task per id, keeps the later input on timestamp ties, then sorts by priority, title, and id", () => {
    const tasks = [
      { id: "a", title: "Gamma", priority: 2, updatedAt: 4 },
      { id: "b", title: "Alpha", priority: 3, updatedAt: 2 },
      { id: "a", title: "Delta", priority: 3, updatedAt: 4 },
      { id: "c", title: "Beta", priority: 3, updatedAt: 1 },
    ];
    const original = tasks.map((task) => ({ ...task }));

    const result = dedupeAndRankTasks(tasks);
    expect(result.map((task) => task.id)).toEqual(["b", "c", "a"]);
    expect(result[0]).toBe(tasks[1]);
    expect(result[2]).toBe(tasks[2]);
    expect(tasks).toEqual(original);
  });
});

/*
 * Research hint: use this only if you are stuck.
 *
 * Concepts: deduplication, sorting, references, immutability
 * Search keywords:
 * - "JavaScript Map deduplicate keep newest record"
 * - "JavaScript replace Map value when timestamp ties"
 * - "JavaScript multi field sort comparator"
 */
