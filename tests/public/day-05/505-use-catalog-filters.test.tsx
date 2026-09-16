/*
 * Exercise contract:
 * 1. Return query, setQuery, onlyFeatured, toggleOnlyFeatured, and visibleProducts from the hook.
 * 2. Filter visible products by a case-insensitive name match and the featured toggle.
 * 3. Sort visibleProducts by name ascending.
 * 4. Preserve control state across rerenders when the product list prop changes.
 * 5. Add one learner-written test for a rerender or source-immutability invariant.
 * 6. Do not mutate the incoming product array or records.
 * 7. visibleProducts must stay derived from the latest inputs and hook state.
 */

import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it } from "vitest";
import {
  useCatalogFilters,
  type CatalogFilterProduct,
} from "../../../src/hooks/505-use-catalog-filters";

type HarnessProps = {
  products: readonly CatalogFilterProduct[];
};

function CatalogFiltersHarness({ products }: HarnessProps) {
  const { query, setQuery, onlyFeatured, toggleOnlyFeatured, visibleProducts } = useCatalogFilters(products);

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
      <label>
        <input type="checkbox" checked={onlyFeatured} onChange={toggleOnlyFeatured} />
        Featured only
      </label>
      <ul aria-label="Visible products">
        {visibleProducts.map((product) => (
          <li key={product.id}>{product.name}</li>
        ))}
      </ul>
    </section>
  );
}

it("derives visible products from query and featured state and keeps control state across rerenders", async () => {
  const user = userEvent.setup();
  const products: CatalogFilterProduct[] = [
    { id: "p1", name: "Cable", featured: false },
    { id: "p2", name: "Camera", featured: true },
    { id: "p3", name: "Lamp", featured: true },
  ];
  const snapshot = structuredClone(products);

  const view = render(<CatalogFiltersHarness products={products} />);

  await user.type(screen.getByRole("searchbox", { name: "Search products" }), "ca");
  expect(within(screen.getByRole("list", { name: "Visible products" })).getAllByRole("listitem").map((item) => item.textContent)).toEqual([
    "Cable",
    "Camera",
  ]);

  await user.click(screen.getByRole("checkbox", { name: "Featured only" }));
  expect(within(screen.getByRole("list", { name: "Visible products" })).getAllByRole("listitem").map((item) => item.textContent)).toEqual([
    "Camera",
  ]);

  view.rerender(
    <CatalogFiltersHarness
      products={[
        ...products,
        { id: "p4", name: "Camcorder", featured: true },
      ]}
    />,
  );

  expect(within(screen.getByRole("list", { name: "Visible products" })).getAllByRole("listitem").map((item) => item.textContent)).toEqual([
    "Camcorder",
    "Camera",
  ]);
  expect(products).toEqual(snapshot);
});

/*
 * Research hint: use this only if you are stuck.
 *
 * Concepts: hooks, react state, filtering, derived state, rerenders
 * Search keywords:
 * - "React custom hook state derived values"
 * - "renderHook rerender preserve state"
 * - "React hook filter featured products"
 */
