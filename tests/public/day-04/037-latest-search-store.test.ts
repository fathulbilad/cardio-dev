/*
 * Exercise contract:
 * 1. Expose an initial idle state with empty query, empty options, and null errorMessage.
 * 2. When search(query) starts, trim the query and move state to loading immediately.
 * 3. When a newer search starts before an older one settles, ignore the older success or error result.
 * 4. When the latest request succeeds, store normalized options using the D4-E01 filtering and sorting contract.
 * 5. search() should resolve after its own request settles or becomes stale, without rejecting because of request failure.
 * 6. Add one learner-written test for a stale-response case.
 * 7. Replace state immutably instead of mutating prior snapshots.
 * 8. Do not use timers to decide which response is latest.
 */

import { describe, expect, it, vi } from "vitest";
import {
  LatestSearchStore,
  type ApiSearchUser,
} from "../../../src/exercises/day-04/037-latest-search-store";

function createDeferred<T>() {
  let resolve!: (value: T | PromiseLike<T>) => void;
  let reject!: (reason?: unknown) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  void promise.catch(() => {});

  return { promise, resolve, reject };
}

describe("LatestSearchStore", () => {
  it("keeps the latest successful search result when an older request resolves later", async () => {
    const deferreds = {
      al: createDeferred<ApiSearchUser[]>(),
      be: createDeferred<ApiSearchUser[]>(),
    };
    const fetchUsers = vi.fn((query: string) => deferreds[query as "al" | "be"].promise);
    const store = new LatestSearchStore(fetchUsers);

    expect(store.getState()).toEqual({
      status: "idle",
      query: "",
      options: [],
      errorMessage: null,
    });

    const firstRequest = store.search("  al ");
    void firstRequest.catch(() => {});
    const firstLoadingState = store.getState();

    expect(firstLoadingState).toEqual({
      status: "loading",
      query: "al",
      options: [],
      errorMessage: null,
    });

    const secondRequest = store.search("be");
    void secondRequest.catch(() => {});

    expect(store.getState()).toEqual({
      status: "loading",
      query: "be",
      options: [],
      errorMessage: null,
    });

    deferreds.be.resolve([
      { id: "u2", name: "Bela", active: true },
      { id: "u1", name: "Ben", active: true, aliases: ["Bee"] },
    ]);

    await expect(secondRequest).resolves.toBeUndefined();

    const latestState = store.getState();

    expect(latestState).toEqual({
      status: "success",
      query: "be",
      options: [
        { id: "u2", label: "Bela" },
        { id: "u1", label: "Ben" },
      ],
      errorMessage: null,
    });

    deferreds.al.resolve([
      { id: "u3", name: "Alice", active: true },
      { id: "u4", name: "Albert", active: true },
    ]);

    await expect(firstRequest).resolves.toBeUndefined();
    expect(store.getState()).toEqual(latestState);
    expect(firstLoadingState).toEqual({
      status: "loading",
      query: "al",
      options: [],
      errorMessage: null,
    });
  });

  it("ignores a stale rejection after a newer request succeeds", async () => {
    const deferreds = {
      al: createDeferred<ApiSearchUser[]>(),
      be: createDeferred<ApiSearchUser[]>(),
    };
    const fetchUsers = vi.fn((query: string) => deferreds[query as "al" | "be"].promise);
    const store = new LatestSearchStore(fetchUsers);

    const firstRequest = store.search("al");
    void firstRequest.catch(() => {});
    const secondRequest = store.search("be");
    void secondRequest.catch(() => {});

    deferreds.be.resolve([{ id: "u1", name: "Ben", active: true }]);
    await secondRequest;

    deferreds.al.reject(new Error("Older request failed"));
    await expect(firstRequest).resolves.toBeUndefined();

    expect(store.getState()).toEqual({
      status: "success",
      query: "be",
      options: [{ id: "u1", label: "Ben" }],
      errorMessage: null,
    });
  });
});

/*
 * Research hint: use this only if you are stuck.
 *
 * Concepts: stale response protection, async state, promises, immutability, error handling
 * Search keywords:
 * - "JavaScript ignore stale async response request id"
 * - "latest request wins async state pattern"
 * - "TypeScript class immutable state snapshot"
 */
