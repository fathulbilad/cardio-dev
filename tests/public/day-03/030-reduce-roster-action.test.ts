/*
 * Exercise contract:
 * 1. Sort active members before inactive members. Within each activity group, sort roles as owner, editor, then viewer. Break equal roles by name ascending, then id ascending.
 * 2. Replace an existing member on upsert instead of duplicating it.
 * 3. Add at least one learner-authored test for the stable-ordering rule.
 * 4. Do not mutate the incoming state or members array.
 * 5. Return the original state when the action makes no change.
 */

import { describe, expect, it } from "vitest";
import { reduceRosterAction } from "../../../src/exercises/day-03/030-reduce-roster-action";

describe("reduceRosterAction", () => {
  it("sorts active first, roles as owner-editor-viewer, then name and id, and preserves missing removals", () => {
    const state = {
      members: [
        { id: "3", name: "Zoe", role: "viewer" as const, active: false },
        { id: "1", name: "Maya", role: "editor" as const, active: true },
      ],
    };

    const updated = reduceRosterAction(state, {
      type: "upsert",
      member: { id: "2", name: "Ari", role: "owner", active: true },
    });
    expect(updated.members.map((member) => member.id)).toEqual(["2", "1", "3"]);

    const deactivated = reduceRosterAction(updated, { type: "deactivate", id: "1" });
    expect(deactivated.members.map((member) => `${member.id}:${member.active}`)).toEqual([
      "2:true",
      "1:false",
      "3:false",
    ]);

    expect(reduceRosterAction(deactivated, { type: "remove", id: "missing" })).toBe(deactivated);
  });
});

/*
 * Research hint: use this only if you are stuck.
 *
 * Concepts: domain rules, state transitions, references, reducer like logic
 * Search keywords:
 * - "JavaScript upsert remove deactivate array reducer"
 * - "JavaScript sort active before inactive boolean comparator"
 * - "JavaScript multi field stable sorting objects"
 */
