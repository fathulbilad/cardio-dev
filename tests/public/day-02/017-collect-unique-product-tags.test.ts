/*
 * Exercise contract:
 * 1. Use only products where discontinued is false.
 * 2. Trim every tag, discard blanks, and remove duplicates.
 * 3. Return the final unique tags in alphabetical order.
 * 4. Add one learner-authored test for repeated or blank tags.
 * 5. The input array and product objects must not change.
 * 6. The output order is alphabetical, not source order.
 * 7. Duplicate tags are compared after trimming.
 */

import { expect, it } from "vitest";
import { collectUniqueProductTags, type Product } from "../../../src/exercises/day-02/017-collect-unique-product-tags";

it("uses only active products, trims tags, removes duplicates, and returns the tags in alphabetical order", () => {
  const products: Product[] = [
    {
      sku: "P-1",
      name: "Keyboard",
      discontinued: false,
      tags: [" office", "peripheral", ""],
    },
    {
      sku: "P-2",
      name: "Mouse",
      discontinued: true,
      tags: ["peripheral", "wireless"],
    },
    {
      sku: "P-3",
      name: "Monitor",
      discontinued: false,
      tags: ["display", "office"],
    },
  ];
  const snapshot = JSON.parse(JSON.stringify(products)) as Product[];

  expect(collectUniqueProductTags(products)).toEqual(["display", "office", "peripheral"]);
  expect(products).toEqual(snapshot);
});

/*
 * Research hint: use this only if you are stuck.
 *
 * Concepts: arrays, set, flattening, deduplication, sorting
 * Search keywords:
 * - "JavaScript Array.flatMap nested tags"
 * - "JavaScript trim deduplicate sort strings Set"
 * - "JavaScript alphabetical sort localeCompare"
 */
