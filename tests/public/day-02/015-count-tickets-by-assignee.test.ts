/*
 * Exercise contract:
 * 1. Count every ticket exactly once.
 * 2. Normalize null, undefined, and blank assignee values to Unassigned.
 * 3. Return the counts in a deterministic Map order.
 * 4. Add one learner-authored test for an unassigned or tie case.
 * 5. Order the Map by count descending, then assignee name ascending.
 * 6. The input array must not be mutated.
 * 7. The returned value must be a Map.
 */

import { expect, it } from "vitest";
import { countTicketsByAssignee, type Ticket } from "../../../src/exercises/day-02/015-count-tickets-by-assignee";

it("counts tickets, normalizes missing or blank assignees, and orders the Map by count then assignee name", () => {
  const tickets: Ticket[] = [
    { id: "T-1", assignee: "Ava" },
    { id: "T-2", assignee: null },
    { id: "T-3", assignee: "Bo" },
    { id: "T-4", assignee: "Ava" },
    { id: "T-5", assignee: " " },
  ];
  const snapshot = JSON.parse(JSON.stringify(tickets)) as Ticket[];

  const result = countTicketsByAssignee(tickets);

  expect(result instanceof Map).toBe(true);
  expect([...result.entries()]).toEqual([
    ["Ava", 2],
    ["Unassigned", 2],
    ["Bo", 1],
  ]);
  expect(tickets).toEqual(snapshot);
});

/*
 * Research hint: use this only if you are stuck.
 *
 * Concepts: map, counting, normalization
 * Search keywords:
 * - "JavaScript Map count occurrences"
 * - "JavaScript normalize null undefined blank string"
 * - "JavaScript sort Map entries deterministic order"
 */
