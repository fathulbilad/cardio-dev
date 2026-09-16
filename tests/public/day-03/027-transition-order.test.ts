/*
 * Exercise contract:
 * 1. A place event may change only draft to placed.
 * 2. A ship event may change only placed to shipped and must record its provided shippedAt timestamp.
 * 3. A cancel event may change draft or placed to cancelled.
 * 4. A note event may append a note in any status without changing the status.
 * 5. Reject every other status transition by returning the original order reference.
 * 6. Add at least one learner-authored test for the rejected transition.
 * 7. Do not mutate the order or its notes array.
 * 8. A successful event may change only the fields documented for that event.
 */

import { describe, expect, it } from "vitest";
import { transitionOrder } from "../../../src/exercises/day-03/027-transition-order";

describe("transitionOrder", () => {
  it("places only drafts, ships only placed orders, appends notes in any status, and preserves invalid states", () => {
    const order = {
      id: "ord-1",
      status: "draft" as const,
      notes: ["created"],
      shippedAt: null,
    };

    const placed = transitionOrder(order, { type: "place" });
    expect(placed).toEqual({
      id: "ord-1",
      status: "placed",
      notes: ["created"],
      shippedAt: null,
    });

    const noted = transitionOrder(placed, { type: "note", note: "packed" });
    expect(noted.notes).toEqual(["created", "packed"]);
    expect(noted.notes).not.toBe(placed.notes);

    const shipped = transitionOrder(placed, { type: "ship", shippedAt: "2024-01-02T10:00:00Z" });
    expect(shipped).toEqual({
      id: "ord-1",
      status: "shipped",
      notes: ["created"],
      shippedAt: "2024-01-02T10:00:00Z",
    });

    expect(transitionOrder(order, { type: "ship", shippedAt: "2024-01-02T10:00:00Z" })).toBe(order);
  });
});

/*
 * Research hint: use this only if you are stuck.
 *
 * Concepts: state transitions, immutability, tie breakers, references
 * Search keywords:
 * - "TypeScript finite state machine allowed transitions"
 * - "JavaScript immutable state transition append array"
 * - "TypeScript discriminated union event reducer"
 */
