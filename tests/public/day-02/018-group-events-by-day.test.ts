/*
 * Exercise contract:
 * 1. Group events by their UTC calendar day.
 * 2. Sort the day keys from earliest to latest.
 * 3. Keep the original event order inside each day bucket.
 * 4. Add one learner-authored test for a day key boundary.
 * 5. Use the YYYY-MM-DD date part of each ISO timestamp.
 * 6. Do not reorder events inside a day bucket.
 * 7. The input array must remain unchanged.
 */

import { expect, it } from "vitest";
import { groupEventsByDay, type AuditEvent } from "../../../src/exercises/day-02/018-group-events-by-day";

it("groups events by UTC day, sorts the day keys, and keeps the original order within each day", () => {
  const events: AuditEvent[] = [
    { id: "e1", kind: "comment", timestamp: "2024-05-02T23:30:00.000Z" },
    { id: "e2", kind: "status", timestamp: "2024-05-01T10:00:00.000Z" },
    { id: "e3", kind: "comment", timestamp: "2024-05-02T12:00:00.000Z" },
  ];
  const snapshot = JSON.parse(JSON.stringify(events)) as AuditEvent[];

  const result = groupEventsByDay(events);

  expect(Object.keys(result)).toEqual(["2024-05-01", "2024-05-02"]);
  expect(result["2024-05-01"]).toEqual([
    { id: "e2", kind: "status", timestamp: "2024-05-01T10:00:00.000Z" },
  ]);
  expect(result["2024-05-02"]).toEqual([
    { id: "e1", kind: "comment", timestamp: "2024-05-02T23:30:00.000Z" },
    { id: "e3", kind: "comment", timestamp: "2024-05-02T12:00:00.000Z" },
  ]);
  expect(events).toEqual(snapshot);
});

/*
 * Research hint: use this only if you are stuck.
 *
 * Concepts: objects, grouping, sorting, dates
 * Search keywords:
 * - "JavaScript group timestamps by UTC calendar date"
 * - "JavaScript Date toISOString UTC day"
 * - "JavaScript sort object entries by date key"
 */
