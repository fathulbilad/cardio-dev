/*
 * Exercise contract:
 * 1. Return an object with a load(id) method.
 * 2. Concurrent load calls for the same id must share one in-flight request.
 * 3. Cache a successful normalized result so later calls for the same id do not refetch.
 * 4. Cache an inactive user as null.
 * 5. Do not cache a rejected request; the next call should retry.
 * 6. Add one learner-written test for the retry-after-failure path.
 * 7. Return active users as { id, label }.
 * 8. Keep the observable behavior deterministic for repeated calls.
 */

import { describe, expect, it, vi } from "vitest";
import {
  createSharedUserLoader,
  type ApiSearchUser,
} from "../../../src/exercises/day-04/038-shared-user-loader";

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

describe("createSharedUserLoader", () => {
  it("shares one in-flight request and caches a successful result", async () => {
    const deferred = createDeferred<ApiSearchUser>();
    const fetchUserById = vi.fn((_id: string) => deferred.promise);
    const loader = createSharedUserLoader(fetchUserById);

    const first = loader.load("u1");
    void first.catch(() => {});
    const second = loader.load("u1");
    void second.catch(() => {});

    expect(fetchUserById).toHaveBeenCalledTimes(1);

    deferred.resolve({ id: "u1", name: "Alice", active: true });

    await expect(Promise.all([first, second])).resolves.toEqual([
      { id: "u1", label: "Alice" },
      { id: "u1", label: "Alice" },
    ]);

    await expect(loader.load("u1")).resolves.toEqual({
      id: "u1",
      label: "Alice",
    });
    expect(fetchUserById).toHaveBeenCalledTimes(1);
  });

  it("retries after a rejection instead of caching the failure", async () => {
    const fetchUserById = vi.fn();
    fetchUserById.mockRejectedValueOnce(new Error("Temporary issue"));
    fetchUserById.mockResolvedValueOnce({ id: "u2", name: "Bea", active: true });
    const loader = createSharedUserLoader(fetchUserById);

    await expect(loader.load("u2")).rejects.toThrow("Temporary issue");
    await expect(loader.load("u2")).resolves.toEqual({
      id: "u2",
      label: "Bea",
    });
    expect(fetchUserById).toHaveBeenCalledTimes(2);
  });

  it("caches an inactive user as null", async () => {
    const fetchUserById = vi.fn(async () => ({
      id: "u3",
      name: "Casey",
      active: false,
    }));
    const loader = createSharedUserLoader(fetchUserById);

    await expect(loader.load("u3")).resolves.toBeNull();
    await expect(loader.load("u3")).resolves.toBeNull();
    expect(fetchUserById).toHaveBeenCalledTimes(1);
  });
});

/*
 * Research hint: use this only if you are stuck.
 *
 * Concepts: concurrency, request deduplication, caching, promises, immutability
 * Search keywords:
 * - "JavaScript cache in flight Promise Map"
 * - "request deduplication concurrent calls same key"
 * - "remove rejected Promise from cache retry"
 */
