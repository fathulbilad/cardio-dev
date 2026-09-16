/*
 * Exercise contract:
 * 1. Render a labeled searchbox named Search catalog.
 * 2. Render a button that toggles the sort label between Sort: A to Z and Sort: Z to A.
 * 3. Filter by a case-insensitive name match and then sort the visible products by the active direction in a list named Catalog products.
 * 4. Show No catalog products. when the active controls hide every item.
 * 5. Add one learner-written test for the second toggle or empty-result case.
 * 6. Do not mutate the input array.
 * 7. Use accessible list and button semantics.
 */

import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it } from "vitest";
import { SortableCatalog } from "../../../src/components/504-sortable-catalog";

it("toggles sort direction and keeps filtering driven by the current control state", async () => {
  const user = userEvent.setup();

  render(
    <SortableCatalog
      products={[
        { id: "p1", name: "Bravo" },
        { id: "p2", name: "Alpha" },
        { id: "p3", name: "Charlie" },
      ]}
    />,
  );

  expect(within(screen.getByRole("list", { name: "Catalog products" })).getAllByRole("listitem").map((item) => item.textContent)).toEqual([
    "Alpha",
    "Bravo",
    "Charlie",
  ]);

  await user.click(screen.getByRole("button", { name: "Sort: A to Z" }));
  expect(screen.getByRole("button", { name: "Sort: Z to A" })).toBeInTheDocument();
  expect(within(screen.getByRole("list", { name: "Catalog products" })).getAllByRole("listitem").map((item) => item.textContent)).toEqual([
    "Charlie",
    "Bravo",
    "Alpha",
  ]);

  await user.type(screen.getByRole("searchbox", { name: "Search catalog" }), "br");
  expect(within(screen.getByRole("list", { name: "Catalog products" })).getAllByRole("listitem").map((item) => item.textContent)).toEqual([
    "Bravo",
  ]);
});

it("shows an empty state when the current filters hide every product", async () => {
  const user = userEvent.setup();

  render(<SortableCatalog products={[{ id: "p1", name: "Alpha" }]} />);

  await user.type(screen.getByRole("searchbox", { name: "Search catalog" }), "zzz");
  expect(screen.getByText("No catalog products.")).toBeInTheDocument();
});

/*
 * Research hint: use this only if you are stuck.
 *
 * Concepts: react state, sorting, filtering, derived state, accessibility
 * Search keywords:
 * - "React sort toggle button derived list"
 * - "React filter and sort from current state"
 * - "Testing Library userEvent click button"
 */
