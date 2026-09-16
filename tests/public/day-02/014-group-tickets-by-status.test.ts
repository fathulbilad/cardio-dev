/*
 * Exercise contract:
 * 1. Return an object with open, pending, and resolved keys.
 * 2. Place each ticket in the array for its status.
 * 3. Keep the original order inside each status array.
 * 4. Add one learner-authored test for a missing status bucket.
 * 5. Every status key must exist, even when empty.
 * 6. Status buckets keep source order.
 * 7. The input array must not be mutated.
 */

import { expect, it } from "vitest";
import { groupTicketsByStatus, type Ticket } from "../../../src/exercises/day-02/014-group-tickets-by-status";

it("groups tickets into every status bucket and preserves the source order inside each bucket", () => {
  const tickets: Ticket[] = [
    { id: "T-1", subject: "Login issue", status: "open" },
    { id: "T-2", subject: "Refund request", status: "resolved" },
    { id: "T-3", subject: "Password reset", status: "open" },
  ];
  const snapshot = JSON.parse(JSON.stringify(tickets)) as Ticket[];

  expect(groupTicketsByStatus(tickets)).toEqual({
    open: [
      { id: "T-1", subject: "Login issue", status: "open" },
      { id: "T-3", subject: "Password reset", status: "open" },
    ],
    pending: [],
    resolved: [
      { id: "T-2", subject: "Refund request", status: "resolved" },
    ],
  });
  expect(tickets).toEqual(snapshot);
});

/*
 * Research hint: use this only if you are stuck.
 *
 * Concepts: objects, grouping, arrays
 * Search keywords:
 * - "TypeScript group objects by property into Record"
 * - "JavaScript build object buckets with loop"
 * - "TypeScript Record union keys arrays"
 */
