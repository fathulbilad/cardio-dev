/*
 * Exercise contract:
 * 1. Ignore rows missing an id or a displayable name.
 * 2. Deduplicate by id, keeping the newest updatedAt record.
 * 3. Sort featured rows first, then by name ascending.
 * 4. Render an accessible table named Inventory with Product and Category columns.
 * 5. Add one learner-written test for an equal-timestamp or invalid-row case.
 * 6. Do not mutate the input array or records.
 * 7. Show No inventory rows. when no valid rows remain.
 */

import { render, screen, within } from "@testing-library/react";
import { expect, it } from "vitest";
import { InventoryTable, type InventoryRecord } from "../../../src/components/502-inventory-table";

it("ignores invalid rows, keeps the newest row per id, and sorts featured first then name without mutation", () => {
  const records: InventoryRecord[] = [
    { id: "p1", name: "Notebook", category: "Office", featured: false, updatedAt: "2024-05-01T10:00:00.000Z" },
    { id: "p2", name: "Desk Lamp", category: "Lighting", featured: true, updatedAt: "2024-05-02T10:00:00.000Z" },
    { id: "p3", name: "Cable", category: "Office", featured: true, updatedAt: "2024-05-03T10:00:00.000Z" },
    { id: "p1", name: "Notebook Pro", category: "Office", featured: false, updatedAt: "2024-05-04T10:00:00.000Z" },
    { id: null, name: "Broken", category: "Office", featured: false, updatedAt: "2024-05-05T10:00:00.000Z" },
    { id: "p4", name: "   ", category: "Office", featured: false, updatedAt: "2024-05-06T10:00:00.000Z" },
  ];
  const snapshot = structuredClone(records);

  render(<InventoryTable records={records} />);

  const table = screen.getByRole("table", { name: "Inventory" });
  const bodyRows = within(table).getAllByRole("row").slice(1);

  expect(bodyRows.map((row) => within(row).getAllByRole("cell").map((cell) => cell.textContent))).toEqual([
    ["Cable", "Office"],
    ["Desk Lamp", "Lighting"],
    ["Notebook Pro", "Office"],
  ]);
  expect(records).toEqual(snapshot);
});

it("shows an empty state when no valid rows remain", () => {
  render(
    <InventoryTable
      records={[
        { id: null, name: null, category: "Office", featured: false, updatedAt: "2024-05-01T10:00:00.000Z" },
      ]}
    />,
  );

  expect(screen.getByText("No inventory rows.")).toBeInTheDocument();
});

/*
 * Research hint: use this only if you are stuck.
 *
 * Concepts: react rendering, deduplication, sorting, records, accessibility
 * Search keywords:
 * - "React accessible table Testing Library getByRole"
 * - "JavaScript deduplicate API records by id newest date"
 * - "React render partial records normalization"
 */
