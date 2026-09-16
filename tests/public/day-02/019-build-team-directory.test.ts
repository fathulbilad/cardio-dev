/*
 * Exercise contract:
 * 1. Keep only active members.
 * 2. Deduplicate members by id, keeping the most recently updated record.
 * 3. Sort the team rows alphabetically by team name.
 * 4. Sort the member names alphabetically inside each team row.
 * 5. Add one learner-authored test for a duplicate id or inactive record.
 * 6. The newest updated record wins for duplicate member ids.
 * 7. The input array and member objects must not be mutated.
 * 8. Team rows and member names are both deterministic.
 */

import { expect, it } from "vitest";
import { buildTeamDirectory, type TeamMember } from "../../../src/exercises/day-02/019-build-team-directory";

it("keeps the newest active member per id and sorts team rows and their member names alphabetically", () => {
  const members: TeamMember[] = [
    {
      id: "m1",
      displayName: "Ava",
      team: "Platform",
      updatedAt: "2024-05-01T10:00:00.000Z",
      active: true,
    },
    {
      id: "m2",
      displayName: "Bo",
      team: "Design",
      updatedAt: "2024-05-02T10:00:00.000Z",
      active: false,
    },
    {
      id: "m1",
      displayName: "Ava Stone",
      team: "Platform",
      updatedAt: "2024-05-03T10:00:00.000Z",
      active: true,
    },
    {
      id: "m3",
      displayName: "Cy",
      team: "Design",
      updatedAt: "2024-05-01T10:00:00.000Z",
      active: true,
    },
    {
      id: "m4",
      displayName: "Dee",
      team: "Design",
      updatedAt: "2024-05-04T10:00:00.000Z",
      active: true,
    },
  ];
  const snapshot = JSON.parse(JSON.stringify(members)) as TeamMember[];

  expect(buildTeamDirectory(members)).toEqual([
    { team: "Design", members: ["Cy", "Dee"] },
    { team: "Platform", members: ["Ava Stone"] },
  ]);
  expect(members).toEqual(snapshot);
});

/*
 * Research hint: use this only if you are stuck.
 *
 * Concepts: objects, grouping, deduplication, sorting, records
 * Search keywords:
 * - "JavaScript deduplicate objects by id newest timestamp Map"
 * - "JavaScript group objects by property"
 * - "JavaScript nested alphabetical sorting localeCompare"
 */
