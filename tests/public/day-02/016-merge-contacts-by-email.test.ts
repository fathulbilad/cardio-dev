/*
 * Exercise contract:
 * 1. Ignore contacts where subscribed is false.
 * 2. Deduplicate by email, keeping the latest updatedAt value.
 * 3. If two matching emails share the same updatedAt, keep the first one encountered.
 * 4. Sort the remaining contacts by lastName, then firstName, then email.
 * 5. Add one learner-authored test for a duplicate email tie.
 * 6. The input array and contact objects must stay unchanged.
 * 7. Ordering is deterministic for equal data.
 * 8. The newest valid record wins for duplicate emails.
 */

import { expect, it } from "vitest";
import { mergeContactsByEmail, type Contact } from "../../../src/exercises/day-02/016-merge-contacts-by-email";

it("keeps the newest subscribed contact per email and sorts by lastName, firstName, then email", () => {
  const contacts: Contact[] = [
    {
      id: "c1",
      firstName: "Ari",
      lastName: "Ng",
      email: "ari@example.com",
      updatedAt: "2024-05-01T12:00:00.000Z",
      subscribed: true,
    },
    {
      id: "c2",
      firstName: "Bea",
      lastName: "Lopez",
      email: "bea@example.com",
      updatedAt: "2024-05-02T12:00:00.000Z",
      subscribed: false,
    },
    {
      id: "c3",
      firstName: "Ari",
      lastName: "Nielsen",
      email: "ari@example.com",
      updatedAt: "2024-05-03T12:00:00.000Z",
      subscribed: true,
    },
    {
      id: "c4",
      firstName: "Cal",
      lastName: "Ng",
      email: "cal@example.com",
      updatedAt: "2024-05-03T12:00:00.000Z",
      subscribed: true,
    },
  ];
  const snapshot = JSON.parse(JSON.stringify(contacts)) as Contact[];

  expect(mergeContactsByEmail(contacts)).toEqual([
    {
      id: "c4",
      firstName: "Cal",
      lastName: "Ng",
      email: "cal@example.com",
      updatedAt: "2024-05-03T12:00:00.000Z",
      subscribed: true,
    },
    {
      id: "c3",
      firstName: "Ari",
      lastName: "Nielsen",
      email: "ari@example.com",
      updatedAt: "2024-05-03T12:00:00.000Z",
      subscribed: true,
    },
  ]);
  expect(contacts).toEqual(snapshot);
});

/*
 * Research hint: use this only if you are stuck.
 *
 * Concepts: objects, map, deduplication, sorting, filtering
 * Search keywords:
 * - "JavaScript Map deduplicate objects keep newest date"
 * - "JavaScript sort objects by lastName then firstName"
 * - "JavaScript Date parse ISO timestamp comparison"
 */
