/*
 * Exercise contract:
 * 1. Apply payments in input order.
 * 2. Ignore payments whose account id does not exist.
 * 3. Reuse untouched account objects when possible.
 * 4. Add at least one learner-authored test for the ignored-account case.
 * 5. Do not mutate the accounts or payments arrays.
 * 6. Keep the accounts in their original order.
 */

import { describe, expect, it } from "vitest";
import { applyPayments } from "../../../src/exercises/day-03/028-apply-payments";

describe("applyPayments", () => {
  it("adds payment amounts to matching accounts in order and keeps untouched accounts by reference", () => {
    const accounts = [
      { id: "checking", balance: 10 },
      { id: "savings", balance: 20 },
      { id: "cash", balance: 0 },
    ];
    const original = accounts.map((account) => ({ ...account }));

    const result = applyPayments(accounts, [
      { accountId: "checking", amount: 5 },
      { accountId: "missing", amount: 100 },
      { accountId: "savings", amount: 3 },
    ]);

    expect(result).toEqual([
      { id: "checking", balance: 15 },
      { id: "savings", balance: 23 },
      { id: "cash", balance: 0 },
    ]);
    expect(result[2]).toBe(accounts[2]);
    expect(accounts).toEqual(original);
  });
});

/*
 * Research hint: use this only if you are stuck.
 *
 * Concepts: reducing, accumulation, references, immutability
 * Search keywords:
 * - "JavaScript apply transactions to matching records"
 * - "JavaScript immutable array update preserve references"
 * - "JavaScript Map index objects by id"
 */
