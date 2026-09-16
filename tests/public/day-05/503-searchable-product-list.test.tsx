/*
 * Exercise contract:
 * 1. Render a labeled searchbox named Search products.
 * 2. Filter visible in-stock products by a case-insensitive name match.
 * 3. Keep visible products sorted by name ascending in an accessible list named Products.
 * 4. Expose the visible count in a status region using the format <count> products.
 * 5. Show No matching products. when the current query matches nothing.
 * 6. Add one learner-written test for case-insensitive matching or empty search text.
 * 7. Visible data should be derived from props and UI state.
 * 8. Do not mutate the source array.
 */

import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it } from "vitest";
import { SearchableProductList } from "../../../src/components/503-searchable-product-list";

it("filters in-stock products by case-insensitive name, sorts by name, and reports the visible count", async () => {
  const user = userEvent.setup();

  render(
    <SearchableProductList
      products={[
        { id: "p1", name: "Camera", inStock: true },
        { id: "p2", name: "Cable", inStock: true },
        { id: "p3", name: "Keyboard", inStock: true },
        { id: "p4", name: "Mouse", inStock: false },
      ]}
    />,
  );

  const list = screen.getByRole("list", { name: "Products" });
  expect(within(list).getAllByRole("listitem").map((item) => item.textContent)).toEqual([
    "Cable",
    "Camera",
    "Keyboard",
  ]);
  expect(screen.getByRole("status")).toHaveTextContent("3 products");

  await user.type(screen.getByRole("searchbox", { name: "Search products" }), "ca");
  expect(within(screen.getByRole("list", { name: "Products" })).getAllByRole("listitem").map((item) => item.textContent)).toEqual([
    "Cable",
    "Camera",
  ]);
  expect(screen.getByRole("status")).toHaveTextContent("2 products");

  await user.clear(screen.getByRole("searchbox", { name: "Search products" }));
  await user.type(screen.getByRole("searchbox", { name: "Search products" }), "zzz");
  expect(screen.getByText("No matching products.")).toBeInTheDocument();
  expect(screen.getByRole("status")).toHaveTextContent("0 products");
});

/*
 * Research hint: use this only if you are stuck.
 *
 * Concepts: react state, filtering, strings, derived state, sorting
 * Search keywords:
 * - "React controlled search input derived filtered list"
 * - "Testing Library userEvent type searchbox"
 * - "React derived state do not store filtered data"
 */
