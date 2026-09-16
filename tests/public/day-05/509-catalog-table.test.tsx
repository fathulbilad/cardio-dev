/*
 * Exercise contract:
 * 1. Ignore records missing an id or a displayable name.
 * 2. Keep only in-stock products.
 * 3. Deduplicate by id, keeping the newest updatedAt record.
 * 4. Render a table named Catalog, a searchbox named Search products, and a category select named Category.
 * 5. Sort visible rows by featured first, then price ascending, then name ascending.
 * 6. Show No matching rows. when the current controls hide every valid row.
 * 7. Add one learner-written test for a duplicate-id, invalid-record, or tie-order invariant.
 * 8. Do not mutate the input array or records.
 * 9. Derived categories and rows must stay deterministic.
 */

import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it } from "vitest";
import { CatalogTable, type CatalogRecord } from "../../../src/components/509-catalog-table";

it("normalizes in-stock records, sorts featured then price then name, and filters by category and search text", async () => {
  const user = userEvent.setup();
  const products: CatalogRecord[] = [
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
      name: "Desk Lamp",
      category: "Lighting",
      priceCents: 2500,
      featured: true,
      inStock: true,
      updatedAt: "2024-05-02T10:00:00.000Z",
    },
    {
      id: "p3",
      name: "Adapter",
      category: "Office",
      priceCents: 800,
      featured: true,
      inStock: true,
      updatedAt: "2024-05-04T10:00:00.000Z",
    },
    {
      id: "p4",
      name: "Notebook",
      category: "Office",
      priceCents: 500,
      featured: true,
      inStock: false,
      updatedAt: "2024-05-05T10:00:00.000Z",
    },
    {
      id: "p5",
      name: "   ",
      category: "Office",
      priceCents: 200,
      featured: false,
      inStock: true,
      updatedAt: "2024-05-06T10:00:00.000Z",
    },
  ];
  const snapshot = structuredClone(products);

  render(<CatalogTable products={products} />);

  const table = screen.getByRole("table", { name: "Catalog" });
  const rowNames = () =>
    within(table)
      .getAllByRole("row")
      .slice(1)
      .map((row) => within(row).getAllByRole("cell")[0]?.textContent);

  expect(rowNames()).toEqual(["Adapter", "Desk Lamp", "Cable Pro"]);

  await user.selectOptions(screen.getByRole("combobox", { name: "Category" }), "Office");
  expect(rowNames()).toEqual(["Adapter", "Cable Pro"]);

  await user.type(screen.getByRole("searchbox", { name: "Search products" }), "cab");
  expect(rowNames()).toEqual(["Cable Pro"]);
  expect(products).toEqual(snapshot);
});

it("shows an empty message when the current controls match no rows", async () => {
  const user = userEvent.setup();

  render(
    <CatalogTable
      products={[
        {
          id: "p1",
          name: "Cable",
          category: "Office",
          priceCents: 1200,
          featured: false,
          inStock: true,
          updatedAt: "2024-05-01T10:00:00.000Z",
        },
      ]}
    />,
  );

  await user.type(screen.getByRole("searchbox", { name: "Search products" }), "zzz");
  expect(screen.getByText("No matching rows.")).toBeInTheDocument();
});

/*
 * Research hint: use this only if you are stuck.
 *
 * Concepts: react state, deduplication, sorting, filtering, partial records, accessibility
 * Search keywords:
 * - "React accessible table search select filters"
 * - "JavaScript normalize deduplicate sort product records"
 * - "Testing Library selectOptions searchbox"
 */
