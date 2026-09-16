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
import { ProductExplorerBoss } from "../../../src/components/510-product-explorer-boss";

it("loads the current query, normalizes results, and filters by category with featured-first price sorting", async () => {
  const user = userEvent.setup();
  const searchProducts = vi.fn().mockResolvedValue([
    {
      id: "p1",
      name: "Desk Lamp",
      category: "Lighting",
      priceCents: 3000,
      featured: true,
      inStock: true,
      updatedAt: "2024-05-01T10:00:00.000Z",
    },
    {
      id: "p2",
      name: "Cable",
      category: "Office",
      priceCents: 1200,
      featured: false,
      inStock: true,
      updatedAt: "2024-05-01T10:00:00.000Z",
    },
    {
      id: "p3",
      name: "Mouse",
      category: "Office",
      priceCents: 1500,
      featured: false,
      inStock: true,
      updatedAt: "2024-05-01T10:00:00.000Z",
    },
  ]);

  render(<ProductExplorerBoss searchProducts={searchProducts} />);

  expect(screen.getByRole("status")).toHaveTextContent("Loading products...");

  const table = await screen.findByRole("table", { name: "Products" });
  const rowNames = () =>
    within(table)
      .getAllByRole("row")
      .slice(1)
      .map((row) => within(row).getAllByRole("cell")[0]?.textContent);

  expect(rowNames()).toEqual(["Desk Lamp", "Cable", "Mouse"]);

  await user.selectOptions(screen.getByRole("combobox", { name: "Category" }), "Office");
  expect(rowNames()).toEqual(["Cable", "Mouse"]);

  await user.click(screen.getByRole("button", { name: "Sort by price: low to high" }));
  expect(screen.getByRole("button", { name: "Sort by price: high to low" })).toBeInTheDocument();
  expect(rowNames()).toEqual(["Mouse", "Cable"]);
});

it("shows an error message and retries the current request", async () => {
  const user = userEvent.setup();
  const searchProducts = vi
    .fn()
    .mockRejectedValueOnce(new Error("boom"))
    .mockResolvedValueOnce([]);

  render(<ProductExplorerBoss searchProducts={searchProducts} />);

  expect(await screen.findByRole("alert")).toHaveTextContent("Could not load products.");

  await user.click(screen.getByRole("button", { name: "Retry" }));
  expect(searchProducts).toHaveBeenNthCalledWith(1, "");
  expect(searchProducts).toHaveBeenNthCalledWith(2, "");
  expect(await screen.findByText("No products found.")).toBeInTheDocument();
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
