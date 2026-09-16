/*
 * Exercise contract:
 * 1. Reuse the unique concurrent loading contract from D4-E04.
 * 2. Return successful active options and failed ids in separate arrays.
 * 3. Preserve first-seen id order in both arrays.
 * 4. Do not reject because one or more individual requests fail.
 * 5. Add one learner-written test for a failure-path ordering case.
 * 6. Each duplicate id should affect the output at most once.
 * 7. Inactive successful users are skipped rather than treated as failures.
 */

import { describe, expect, it, vi } from "vitest";
import {
  loadSelectedOptionsSettled,
  type ApiSearchUser,
} from "../../../src/exercises/day-04/035-load-selected-options-settled";

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

describe("loadSelectedOptionsSettled", () => {
  it("collects successful options and failed ids without rejecting the whole batch", async () => {
    const deferreds: Record<string, ReturnType<typeof createDeferred<ApiSearchUser>>> = {
      a: createDeferred<ApiSearchUser>(),
      b: createDeferred<ApiSearchUser>(),
      c: createDeferred<ApiSearchUser>(),
    };
    const fetchUserById = vi.fn((id: string) => deferreds[id].promise);

    const request = loadSelectedOptionsSettled(["a", "b", "a", "c"], fetchUserById);
    void request.catch(() => {});

    expect(fetchUserById).toHaveBeenCalledTimes(3);

    deferreds.a.resolve({ id: "a", name: "Alice", active: true });
    deferreds.b.reject(new Error("Missing user"));
    deferreds.c.resolve({ id: "c", name: "Casey", active: false });

    await expect(request).resolves.toEqual({
      options: [{ id: "a", label: "Alice" }],
      failedIds: ["b"],
    });
  });

  it("preserves first-seen order for multiple failures", async () => {
    const fetchUserById = vi.fn(async (id: string) => {
      if (id === "b" || id === "a") {
        throw new Error(`No ${id}`);
      }

      return { id: "c", name: "Casey", active: true };
    });

    await expect(
      loadSelectedOptionsSettled(["b", "a", "c", "b"], fetchUserById),
    ).resolves.toEqual({
      options: [{ id: "c", label: "Casey" }],
      failedIds: ["b", "a"],
    });
  });
});

/*
 * Research hint: use this only if you are stuck.
 *
 * Concepts: concurrency, partial failure, promises, deduplication, immutability
 * Search keywords:
 * - "JavaScript Promise.allSettled preserve input order"
 * - "TypeScript PromiseSettledResult fulfilled rejected"
 * - "JavaScript partial failure concurrent requests"
 */
