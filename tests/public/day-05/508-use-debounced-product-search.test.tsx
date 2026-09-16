/*
 * Exercise contract:
 * 1. Return query, setQuery, results, loading, and error from the hook.
 * 2. Wait for delayMs before starting a request for the current query.
 * 3. Clear the pending timer when the query changes before the delay elapses.
 * 4. Ignore an older request result if a newer query has already started.
 * 5. Set loading while the active request is running and clear it afterward.
 * 6. Expose an error state when the active request rejects.
 * 7. Add one learner-written test for a rejection path or stale-response invariant.
 * 8. Behavior must be deterministic under fake timers.
 * 9. Do not mutate returned result arrays.
 */

import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, expect, it, vi } from "vitest";
import {
  useDebouncedProductSearch,
  type ProductSearch,
} from "../../../src/hooks/508-use-debounced-product-search";

afterEach(() => {
  vi.useRealTimers();
});

function createDeferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason?: unknown) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

type HarnessProps = {
  searchProducts: ProductSearch;
  delayMs?: number;
};

function DebouncedSearchHarness({ searchProducts, delayMs = 300 }: HarnessProps) {
  const { query, setQuery, results, loading, error } = useDebouncedProductSearch(searchProducts, delayMs);

  return (
    <section>
      <label>
        Search products
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.currentTarget.value)}
        />
      </label>
      {loading ? <p role="status">Searching...</p> : null}
      {error ? <p role="alert">Could not search products.</p> : null}
      <ul aria-label="Results">
        {results.map((result) => (
          <li key={result.id}>{result.name}</li>
        ))}
      </ul>
    </section>
  );
}

it("waits for the debounce delay and ignores an older response that finishes late", async () => {
  vi.useFakeTimers();
  const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
  const first = createDeferred<readonly { id: string; name: string }[]>();
  const second = createDeferred<readonly { id: string; name: string }[]>();
  const searchProducts = vi.fn((query: string) => {
    if (query === "ca") {
      return first.promise;
    }
    if (query === "car") {
      return second.promise;
    }
    return Promise.resolve([]);
  });

  render(<DebouncedSearchHarness searchProducts={searchProducts} delayMs={300} />);

  const input = screen.getByRole("searchbox", { name: "Search products" });
  await user.type(input, "ca");
  expect(searchProducts).not.toHaveBeenCalled();

  act(() => {
    vi.advanceTimersByTime(300);
  });
  expect(searchProducts).toHaveBeenNthCalledWith(1, "ca");

  await user.type(input, "r");
  act(() => {
    vi.advanceTimersByTime(300);
  });
  expect(searchProducts).toHaveBeenNthCalledWith(2, "car");
  expect(screen.getByRole("status")).toHaveTextContent("Searching...");

  second.resolve([{ id: "p2", name: "Card Reader" }]);
  expect(await screen.findByText("Card Reader")).toBeInTheDocument();

  first.resolve([{ id: "p1", name: "Camera" }]);
  await Promise.resolve();

  expect(within(screen.getByRole("list", { name: "Results" })).getAllByRole("listitem").map((item) => item.textContent)).toEqual([
    "Card Reader",
  ]);
  expect(screen.queryByText("Camera")).not.toBeInTheDocument();
});

it("reports an error when the debounced request rejects", async () => {
  vi.useFakeTimers();
  const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime });
  const failed = createDeferred<readonly { id: string; name: string }[]>();
  const searchProducts = vi.fn(() => failed.promise);

  render(<DebouncedSearchHarness searchProducts={searchProducts} delayMs={300} />);

  await user.type(screen.getByRole("searchbox", { name: "Search products" }), "x");
  act(() => {
    vi.advanceTimersByTime(300);
  });

  failed.reject(new Error("boom"));
  expect(await screen.findByRole("alert")).toHaveTextContent("Could not search products.");
});

/*
 * Research hint: use this only if you are stuck.
 *
 * Concepts: hooks, async, debounce, stale responses, effects
 * Search keywords:
 * - "React debounced search hook fake timers"
 * - "Vitest vi useFakeTimers advanceTimersByTimeAsync"
 * - "React ignore stale async response useEffect"
 */
