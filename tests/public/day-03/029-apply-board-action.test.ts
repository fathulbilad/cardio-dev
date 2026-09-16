/*
 * Exercise contract:
 * 1. Move a card only when it exists in the declared source lane.
 * 2. Insert moved cards at the end of the destination lane.
 * 3. Rename a card wherever it currently lives.
 * 4. Return the original board state when an action changes nothing.
 * 5. Add at least one learner-authored test for the invalid move case.
 * 6. Do not mutate any lane array or card object.
 * 7. Keep the relative order of cards that are not moved.
 */

import { describe, expect, it } from "vitest";
import { applyBoardAction } from "../../../src/exercises/day-03/029-apply-board-action";

describe("applyBoardAction", () => {
  it("moves an existing card from its declared lane to the destination end and renames cards immutably", () => {
    const state = {
      backlog: [{ id: "task-1", title: "Draft" }],
      active: [{ id: "task-2", title: "Build" }],
      done: [{ id: "task-3", title: "Ship" }],
    };

    const moved = applyBoardAction(state, { type: "move", id: "task-1", from: "backlog", to: "active" });
    expect(moved).toEqual({
      backlog: [],
      active: [
        { id: "task-2", title: "Build" },
        { id: "task-1", title: "Draft" },
      ],
      done: [{ id: "task-3", title: "Ship" }],
    });
    expect(moved.done[0]).toBe(state.done[0]);

    const renamed = applyBoardAction(moved, { type: "rename", id: "task-2", title: "Build v2" });
    expect(renamed.active[0]).toEqual({ id: "task-2", title: "Build v2" });
    expect(applyBoardAction(state, { type: "move", id: "missing", from: "backlog", to: "done" })).toBe(state);
  });
});

/*
 * Research hint: use this only if you are stuck.
 *
 * Concepts: nested state, reducer like logic, sorting, immutability
 * Search keywords:
 * - "JavaScript immutable nested state update"
 * - "JavaScript move item between nested arrays"
 * - "reducer invalid action return original state reference"
 */
