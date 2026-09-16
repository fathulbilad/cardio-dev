/*
 * Exercise contract:
 * 1. Call searchProducts with the current query on mount and whenever the query changes.
 * 2. Show Loading products... in a status region during the active request.
 * 3. Show Could not load products. in an alert with a Retry button when the active request fails.
 * 4. Retry the latest failed query instead of resetting to an older one.
 * 5. Normalize the latest response by removing invalid rows, keeping only in-stock rows, and deduplicating by id with newest updatedAt wins.
 * 6. Render a searchbox named Search products, a table named Products, and a select named Category.
 * 7. Render a sort button that toggles between Sort by price: low to high and Sort by price: high to low. Apply that price direction after featured-first grouping.
 * 8. Ignore stale responses from older requests.
 * 9. Show No products found. when the latest normalized result set is empty after filters.
 * 10. Add one learner-written test covering an uncovered failure path or invariant risk.
 * 11. Do not mutate fetched arrays or records.
 * 12. Use accessible table, status, alert, button, searchbox, and combobox semantics.
 * 13. Boss behavior must remain deterministic under deferred promises.
 */

import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
import { ProductExplorerBoss, type ExplorerProductRecord } from "../../../src/components/510-product-explorer-boss";

function createDeferred<T>() {
  let resolve!: (value: T) => void;
  let reject!: (reason?: unknown) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

it("removes invalid and out-of-stock rows, keeps the newest row per id, and sorts without mutating the payload", async () => {
  const user = userEvent.setup();
  const payload: ExplorerProductRecord[] = [
    {
      id: "p1",
      name: "Cable",
      category: "Office",
      priceCents: 1200,
      featured: false,
      inStock: true,
      updatedAt: "2024-05-01T10:00:00.000Z",
    },
    {
      id: "p1",
      name: "Cable Pro",
      category: "Office",
      priceCents: 1500,
      featured: false,
      inStock: true,
      updatedAt: "2024-05-03T10:00:00.000Z",
    },
    {
      id: "p2",
      name: "Adapter",
      category: "Office",
      priceCents: 800,
      featured: true,
      inStock: true,
      updatedAt: "2024-05-02T10:00:00.000Z",
    },
    {
      id: "p3",
      name: "Desk Lamp",
      category: "Lighting",
      priceCents: 2500,
      featured: true,
      inStock: true,
      updatedAt: "2024-05-02T10:00:00.000Z",
    },
    {
      id: "p4",
      name: "Notebook",
      category: "Office",
      priceCents: 500,
      featured: true,
      inStock: false,
      updatedAt: "2024-05-02T10:00:00.000Z",
    },
    {
      id: null,
      name: "Broken",
      category: "Office",
      priceCents: 200,
      featured: false,
      inStock: true,
      updatedAt: "2024-05-02T10:00:00.000Z",
    },
    {
      id: "p5",
      name: "   ",
      category: "Office",
      priceCents: 100,
      featured: false,
      inStock: true,
      updatedAt: "2024-05-02T10:00:00.000Z",
    },
  ];
  const snapshot = structuredClone(payload);
  const searchProducts = vi.fn().mockResolvedValue(payload);

  render(<ProductExplorerBoss searchProducts={searchProducts} />);

  const table = await screen.findByRole("table", { name: "Products" });
  const rowNames = () =>
    within(table)
      .getAllByRole("row")
      .slice(1)
      .map((row) => within(row).getAllByRole("cell")[0]?.textContent);

  expect(rowNames()).toEqual(["Adapter", "Desk Lamp", "Cable Pro"]);

  await user.selectOptions(screen.getByRole("combobox", { name: "Category" }), "Office");
  expect(rowNames()).toEqual(["Adapter", "Cable Pro"]);
  expect(payload).toEqual(snapshot);
});

it("ignores an older request that resolves after a newer query finishes", async () => {
  const user = userEvent.setup();
  const first = createDeferred<readonly ExplorerProductRecord[]>();
  const second = createDeferred<readonly ExplorerProductRecord[]>();
  const searchProducts = vi.fn((query: string) => {
    if (query === "") {
      return first.promise;
    }
    if (query === "c") {
      return second.promise;
    }
    return Promise.resolve([]);
  });

  render(<ProductExplorerBoss searchProducts={searchProducts} />);

  await user.type(screen.getByRole("searchbox", { name: "Search products" }), "c");
  expect(searchProducts).toHaveBeenNthCalledWith(1, "");
  expect(searchProducts).toHaveBeenNthCalledWith(2, "c");

  second.resolve([
    {
      id: "p2",
      name: "Camera",
      category: "Office",
      priceCents: 4000,
      featured: false,
      inStock: true,
      updatedAt: "2024-05-02T10:00:00.000Z",
    },
  ]);

  expect(await screen.findByText("Camera")).toBeInTheDocument();

  first.resolve([
    {
      id: "p1",
      name: "Cable",
      category: "Office",
      priceCents: 1200,
      featured: false,
      inStock: true,
      updatedAt: "2024-05-01T10:00:00.000Z",
    },
  ]);

  await Promise.resolve();
  expect(screen.queryByText("Cable")).not.toBeInTheDocument();
  expect(screen.getByText("Camera")).toBeInTheDocument();
});

it("retries the latest query after a failed search", async () => {
  const user = userEvent.setup();
  const searchProducts = vi
    .fn()
    .mockResolvedValueOnce([])
    .mockRejectedValueOnce(new Error("boom"))
    .mockResolvedValueOnce([
      {
        id: "p1",
        name: "Lamp",
        category: "Lighting",
        priceCents: 2500,
        featured: false,
        inStock: true,
        updatedAt: "2024-05-02T10:00:00.000Z",
      },
    ]);

  render(<ProductExplorerBoss searchProducts={searchProducts} />);

  await screen.findByText("No products found.");
  await user.type(screen.getByRole("searchbox", { name: "Search products" }), "l");
  expect(await screen.findByRole("alert")).toHaveTextContent("Could not load products.");

  await user.click(screen.getByRole("button", { name: "Retry" }));

  expect(searchProducts).toHaveBeenNthCalledWith(2, "l");
  expect(searchProducts).toHaveBeenNthCalledWith(3, "l");
  expect(await screen.findByText("Lamp")).toBeInTheDocument();
});

/*
 * Research hint: use this only if you are stuck.
 *
 * Concepts: boss integration, react effects, async, stale responses, retry, deduplication, sorting, filtering
 * Search keywords:
 * - "React async search stale response retry"
 * - "React AbortController or request id latest response"
 * - "Testing Library async integration test filters sorting"
 */
