/*
 * Exercise contract:
 * 1. Sort tasks from highest priority to lowest priority.
 * 2. Break equal priorities by earlier due date, then by title, then by id.
 * 3. Do not mutate the input array or task objects.
 * 4. Add one learner-authored test for a same-priority tie.
 * 5. The same input must always produce the same order.
 * 6. Equal priorities use dueAt ascending.
 * 7. Equal dueAt values use title ascending, then id ascending.
 */

import { expect, it } from "vitest";
import { sortTasksByPriority, type Task } from "../../../src/exercises/day-02/012-sort-tasks-by-priority";

it("sorts by priority descending, dueAt ascending, title ascending, then id ascending without mutation", () => {
  const tasks: Task[] = [
    { id: "A", title: "Write summary", priority: 2, dueAt: "2024-05-02T10:00:00.000Z" },
    { id: "B", title: "Fix bug", priority: 3, dueAt: "2024-05-03T10:00:00.000Z" },
    { id: "C", title: "Archive logs", priority: 3, dueAt: "2024-05-01T10:00:00.000Z" },
  ];
  const snapshot = JSON.parse(JSON.stringify(tasks)) as Task[];

  expect(sortTasksByPriority(tasks)).toEqual([
    { id: "C", title: "Archive logs", priority: 3, dueAt: "2024-05-01T10:00:00.000Z" },
    { id: "B", title: "Fix bug", priority: 3, dueAt: "2024-05-03T10:00:00.000Z" },
    { id: "A", title: "Write summary", priority: 2, dueAt: "2024-05-02T10:00:00.000Z" },
  ]);
  expect(tasks).toEqual(snapshot);
});

/*
 * Research hint: use this only if you are stuck.
 *
 * Concepts: arrays, sorting, records
 * Search keywords:
 * - "JavaScript Array.sort comparator multiple fields"
 * - "JavaScript sort without mutating array toSorted"
 * - "JavaScript localeCompare tie breaker"
 */
