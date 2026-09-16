/*
 * Exercise contract:
 * 1. Add quantities to an existing item or append a new one.
 * 2. If a set action targets a missing id with a positive quantity, append it.
 * 3. Remove an item when its set quantity is zero or below.
 * 4. Return the same state reference when the action changes nothing.
 * 5. Add at least one learner-authored test for the no-op action.
 * 6. Do not mutate the state object or any item object.
 * 7. Preserve the order of untouched items.
 */

import { describe, expect, it } from "vitest";
import { applyCartAction } from "../../../src/exercises/day-03/026-apply-cart-action";

describe("applyCartAction", () => {
  it("adds quantities, removes items set to a nonpositive quantity, and preserves no-op state", () => {
    const state = {
      items: [
        { id: "tea", quantity: 1 },
        { id: "coffee", quantity: 2 },
      ],
    };
    const original = {
      items: state.items.map((item) => ({ ...item })),
    };

    const afterAdd = applyCartAction(state, { type: "add", id: "tea", quantity: 3 });
    expect(afterAdd).toEqual({
      items: [
        { id: "tea", quantity: 4 },
        { id: "coffee", quantity: 2 },
      ],
    });
    expect(afterAdd.items[1]).toBe(state.items[1]);

    const afterRemove = applyCartAction(afterAdd, { type: "set", id: "coffee", quantity: 0 });
    expect(afterRemove).toEqual({
      items: [{ id: "tea", quantity: 4 }],
    });

    expect(applyCartAction(afterRemove, { type: "remove", id: "missing" })).toBe(afterRemove);
    expect(state).toEqual(original);
  });
});

/*
 * Research hint: use this only if you are stuck.
 *
 * Concepts: state transitions, reducer like logic, objects, arrays
 * Search keywords:
 * - "TypeScript reducer discriminated union actions"
 * - "JavaScript immutable cart quantity update"
 * - "JavaScript structural sharing return same state no change"
 */
