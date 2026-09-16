/*
 * Exercise contract:
 * 1. Trim each label before checking it.
 * 2. Discard blank labels after trimming.
 * 3. Keep the first occurrence of each trimmed label.
 * 4. Add one learner-authored test for blanks or duplicate spacing.
 * 5. The returned Set must preserve first-seen order.
 * 6. Duplicates are compared after trimming.
 * 7. The input array must not change.
 */

import { expect, it } from "vitest";
import { collectUniqueLabels } from "../../../src/exercises/day-02/013-collect-unique-labels";

it("trims labels, removes duplicates, and keeps the first seen order without mutating the input", () => {
  const labels = ["  bug", "ui", "", "bug", "  ui ", "docs"];
  const snapshot = JSON.parse(JSON.stringify(labels)) as string[];

  const result = collectUniqueLabels(labels);

  expect(result instanceof Set).toBe(true);
  expect([...result]).toEqual(["bug", "ui", "docs"]);
  expect(labels).toEqual(snapshot);
});

/*
 * Research hint: use this only if you are stuck.
 *
 * Concepts: set, deduplication, strings
 * Search keywords:
 * - "JavaScript trim strings remove blanks"
 * - "JavaScript Set preserve insertion order"
 * - "TypeScript Set unique strings"
 */
