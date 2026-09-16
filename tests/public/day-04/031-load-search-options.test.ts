/*
 * Exercise contract:
 * 1. Trim the query before calling the loader.
 * 2. Include only active users whose name or alias contains the trimmed query, case-insensitively.
 * 3. If the trimmed query is empty, include all active users.
 * 4. Return options sorted by label ascending, then id ascending.
 * 5. Do not mutate the loader result array or its records.
 * 6. Use the observable async result rather than timers.
 * 7. Return objects shaped exactly as { id, label }.
 */

import { describe, expect, it, vi } from "vitest";
import {
  loadSearchOptions,
  type ApiSearchUser,
} from "../../../src/exercises/day-04/031-load-search-options";

describe("loadSearchOptions", () => {
  it("trims the query, matches active names or aliases ignoring case, and sorts by label then id without mutation", async () => {
    const users: ApiSearchUser[] = [
      { id: "u2", name: "Sally", active: true, aliases: ["Ally"] },
      { id: "u1", name: "Alice", active: true, aliases: ["Ace"] },
      { id: "u3", name: "ALBERT", active: false, aliases: ["Al"] },
      { id: "u4", name: "Bea", active: true, aliases: ["Pal"] },
    ];
    const snapshot = users.map((user) => ({
      ...user,
      aliases: user.aliases ? [...user.aliases] : undefined,
    }));
    const fetchUsers = vi.fn(async (_query: string) => users);

    await expect(loadSearchOptions(fetchUsers, "  al ")).resolves.toEqual([
      { id: "u1", label: "Alice" },
      { id: "u2", label: "Sally" },
    ]);

    expect(fetchUsers).toHaveBeenCalledWith("al");
    expect(users).toEqual(snapshot);
  });

  it("returns every active user for an empty trimmed query, sorted by label then id", async () => {
    const users: ApiSearchUser[] = [
      { id: "b", name: "Mila", active: true },
      { id: "a", name: "Mila", active: true },
      { id: "c", name: "Nora", active: false },
    ];
    const fetchUsers = vi.fn(async (_query: string) => users);

    await expect(loadSearchOptions(fetchUsers, "   ")).resolves.toEqual([
      { id: "a", label: "Mila" },
      { id: "b", label: "Mila" },
    ]);
  });
});

/*
 * Research hint: use this only if you are stuck.
 *
 * Concepts: promises, async await, filtering, sorting, immutability
 * Search keywords:
 * - "TypeScript async function await Promise"
 * - "JavaScript filter map sort async result"
 * - "JavaScript case insensitive search aliases"
 */
