/*
 * Exercise contract:
 * 1. Emit a loading state immediately with the trimmed query, empty options, and null errorMessage.
 * 2. Then emit either a success state with normalized options or an error state with a message.
 * 3. Reuse the same trimming, filtering, and sorting contract as D4-E01.
 * 4. Resolve after the final state is emitted, even when the loader fails.
 * 5. Emit fresh state objects instead of mutating a previous state snapshot.
 * 6. Do not depend on real-time waits.
 * 7. Do not reject because of the loader failure.
 */

import { describe, expect, it, vi } from "vitest";
import {
  runSearchRequest,
  type ApiSearchUser,
  type SearchRequestState,
} from "../../../src/exercises/day-04/033-run-search-request";

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

describe("runSearchRequest", () => {
  it("emits a loading state immediately and then a success state", async () => {
    const deferred = createDeferred<ApiSearchUser[]>();
    const states: SearchRequestState[] = [];
    const fetchUsers = vi.fn((_query: string) => deferred.promise);

    const request = runSearchRequest(fetchUsers, "  al ", (state) => {
      states.push(state);
    });
    void request.catch(() => {});

    expect(states).toEqual([
      {
        status: "loading",
        query: "al",
        options: [],
        errorMessage: null,
      },
    ]);

    const loadingState = states[0];

    deferred.resolve([
      { id: "u2", name: "Sally", active: true, aliases: ["Ally"] },
      { id: "u1", name: "Alice", active: true, aliases: ["Ace"] },
      { id: "u3", name: "ALBERT", active: false, aliases: ["Al"] },
    ]);

    await expect(request).resolves.toBeUndefined();

    expect(states).toEqual([
      {
        status: "loading",
        query: "al",
        options: [],
        errorMessage: null,
      },
      {
        status: "success",
        query: "al",
        options: [
          { id: "u1", label: "Alice" },
          { id: "u2", label: "Sally" },
        ],
        errorMessage: null,
      },
    ]);
    expect(states[0]).not.toBe(states[1]);
    expect(loadingState).toEqual({
      status: "loading",
      query: "al",
      options: [],
      errorMessage: null,
    });
    expect(fetchUsers).toHaveBeenCalledWith("al");
  });

  it("emits an error state and resolves when the loader fails", async () => {
    const states: SearchRequestState[] = [];
    const fetchUsers = vi.fn(async () => {
      throw new Error("Network down");
    });

    await expect(
      runSearchRequest(fetchUsers, "be", (state) => {
        states.push(state);
      }),
    ).resolves.toBeUndefined();

    expect(states).toEqual([
      {
        status: "loading",
        query: "be",
        options: [],
        errorMessage: null,
      },
      {
        status: "error",
        query: "be",
        options: [],
        errorMessage: "Network down",
      },
    ]);
  });
});

/*
 * Research hint: use this only if you are stuck.
 *
 * Concepts: async state, promises, error handling, immutability, filtering, sorting
 * Search keywords:
 * - "TypeScript async callback loading success error state"
 * - "JavaScript immutable state snapshots callback"
 * - "TypeScript Promise resolve after catch"
 */
