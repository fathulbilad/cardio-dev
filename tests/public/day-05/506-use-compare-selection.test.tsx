/*
 * Exercise contract:
 * 1. Initialize from a list of ids but keep each id only once.
 * 2. toggleSelected adds a missing id or removes an existing id.
 * 3. Preserve first-selected order in selectedIds.
 * 4. clearSelected removes every selection.
 * 5. isSelected reports whether an id is currently selected.
 * 6. Add one learner-written test for duplicate initial ids or a clear-selection invariant.
 * 7. Selections should update immutably.
 * 8. Repeated toggles must stay deterministic.
 */

import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it } from "vitest";
import { useCompareSelection } from "../../../src/hooks/506-use-compare-selection";

type HarnessProps = {
  initialIds?: readonly string[];
  productIds: readonly string[];
};

function CompareSelectionHarness({ initialIds = [], productIds }: HarnessProps) {
  const { selectedIds, toggleSelected, clearSelected, isSelected } = useCompareSelection(initialIds);

  return (
    <section>
      <button type="button" onClick={clearSelected}>
        Clear selection
      </button>
      {selectedIds.length === 0 ? (
        <p>No selected items.</p>
      ) : (
        <ul aria-label="Selected ids">
          {selectedIds.map((id) => (
            <li key={id}>{id}</li>
          ))}
        </ul>
      )}
      <div>
        {productIds.map((id) => (
          <button
            key={id}
            type="button"
            aria-pressed={isSelected(id)}
            onClick={() => toggleSelected(id)}
          >
            {id}
          </button>
        ))}
      </div>
    </section>
  );
}

it("toggles unique selections, preserves first-selected order, and clears everything", async () => {
  const user = userEvent.setup();

  render(<CompareSelectionHarness initialIds={["p2", "p2"]} productIds={["p1", "p2", "p3"]} />);

  expect(within(screen.getByRole("list", { name: "Selected ids" })).getAllByRole("listitem").map((item) => item.textContent)).toEqual([
    "p2",
  ]);
  expect(screen.getByRole("button", { name: "p2" })).toHaveAttribute("aria-pressed", "true");

  await user.click(screen.getByRole("button", { name: "p1" }));
  expect(within(screen.getByRole("list", { name: "Selected ids" })).getAllByRole("listitem").map((item) => item.textContent)).toEqual([
    "p2",
    "p1",
  ]);

  await user.click(screen.getByRole("button", { name: "p2" }));
  expect(within(screen.getByRole("list", { name: "Selected ids" })).getAllByRole("listitem").map((item) => item.textContent)).toEqual([
    "p1",
  ]);
  expect(screen.getByRole("button", { name: "p2" })).toHaveAttribute("aria-pressed", "false");

  await user.click(screen.getByRole("button", { name: "Clear selection" }));
  expect(screen.getByText("No selected items.")).toBeInTheDocument();
});

/*
 * Research hint: use this only if you are stuck.
 *
 * Concepts: hooks, state transitions, deduplication, immutability, sets
 * Search keywords:
 * - "React custom hook toggle selection array"
 * - "renderHook act Testing Library"
 * - "JavaScript deduplicate initial ids Set"
 */
