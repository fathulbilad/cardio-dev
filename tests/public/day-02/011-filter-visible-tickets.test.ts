/*
 * Exercise contract:
 * 1. Return only tickets where archived is false.
 * 2. Keep the remaining tickets in their original order.
 * 3. Do not mutate the input array or ticket objects.
 * 4. The output must be a new array.
 * 5. Order is preserved from the source array.
 * 6. Archived tickets are always excluded.
 */

import { expect, it } from "vitest";
import { getVisibleTickets, type Ticket } from "../../../src/exercises/day-02/011-filter-visible-tickets";

it("returns only unarchived tickets in their original order without mutating the input", () => {
  const tickets: Ticket[] = [
    { id: "T-1", subject: "Reset password", archived: false },
    { id: "T-2", subject: "Update billing", archived: true },
    { id: "T-3", subject: "Cancel subscription", archived: false },
  ];
  const snapshot = JSON.parse(JSON.stringify(tickets)) as Ticket[];

  expect(getVisibleTickets(tickets)).toEqual([
    { id: "T-1", subject: "Reset password", archived: false },
    { id: "T-3", subject: "Cancel subscription", archived: false },
  ]);
  expect(tickets).toEqual(snapshot);
});

/*
 * Research hint: use this only if you are stuck.
 *
 * Concepts: arrays, filtering, records
 * Search keywords:
 * - "JavaScript Array.filter objects by boolean property"
 * - "JavaScript preserve array order when filtering"
 * - "TypeScript readonly object array"
 */
