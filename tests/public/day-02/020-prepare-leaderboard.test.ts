/*
 * Exercise contract:
 * 1. Keep only active entries.
 * 2. Deduplicate by playerId, keeping the highest score; if scores tie, keep the newer updatedAt value.
 * 3. Sort the final rows by score descending, then displayName ascending, then playerId ascending.
 * 4. Assign ranks starting at 1 after sorting.
 * 5. Add one learner-authored test for a duplicate or score-tie case.
 * 6. The input array and entry objects must not be mutated.
 * 7. The same input must always produce the same ranks.
 * 8. Tie handling must be explicit and deterministic.
 */

import { expect, it } from "vitest";
import { prepareLeaderboard, type LeaderboardEntry } from "../../../src/exercises/day-02/020-prepare-leaderboard";

it("keeps each active player's best score, sorts score descending then name and id ascending, and assigns ranks", () => {
  const entries: LeaderboardEntry[] = [
    {
      playerId: "p1",
      displayName: "Zoe",
      score: 18,
      updatedAt: "2024-05-01T09:00:00.000Z",
      active: true,
    },
    {
      playerId: "p2",
      displayName: "Ana",
      score: 22,
      updatedAt: "2024-05-01T09:00:00.000Z",
      active: false,
    },
    {
      playerId: "p1",
      displayName: "Zoe",
      score: 24,
      updatedAt: "2024-05-03T09:00:00.000Z",
      active: true,
    },
    {
      playerId: "p3",
      displayName: "Bea",
      score: 24,
      updatedAt: "2024-05-02T09:00:00.000Z",
      active: true,
    },
    {
      playerId: "p4",
      displayName: "Cal",
      score: 24,
      updatedAt: "2024-05-02T09:00:00.000Z",
      active: true,
    },
  ];
  const snapshot = JSON.parse(JSON.stringify(entries)) as LeaderboardEntry[];

  expect(prepareLeaderboard(entries)).toEqual([
    { rank: 1, playerId: "p3", displayName: "Bea", score: 24 },
    { rank: 2, playerId: "p4", displayName: "Cal", score: 24 },
    { rank: 3, playerId: "p1", displayName: "Zoe", score: 24 },
  ]);
  expect(entries).toEqual(snapshot);
});

/*
 * Research hint: use this only if you are stuck.
 *
 * Concepts: map, deduplication, sorting, filtering, records
 * Search keywords:
 * - "JavaScript deduplicate leaderboard highest score Map"
 * - "JavaScript sort comparator multiple tie breakers"
 * - "JavaScript assign rank after sorting map index"
 */
